import PostSummary from '../components/PostSummary'
import Link from 'next/link'
import Image from 'next/image'

export const EVChargerDLB = () => {
  return (
    <div className="flex flex-col">
      <PostSummary
        title="Dynamic Load Management for EV Chargers"
        isPageHeader={true}
        link="/articles/EVChargerDLB"
        desc="Ethan Husband - DD/MM/YY"
      >
        <div className="flex flex-col gap-y-4">
          <h1 className="text-2xl underline text-secondary">
            Context: The Charging Problem
          </h1>
          <div>
            In the rapidly growing electric vehicle industry, the importance of
            accessible and reliable charging infrastructure is vital to a
            complete transition from combustion vehicles. Charging, whether it
            be infrastructure, batteries, the capacities of chargers, is often
            cited as the biggest problem holding back electric vehicles from
            reaching the{' '}
            <Link
              className="text-secondary"
              target="_blank"
              href="https://www.energymonitor.ai/sectors/automotive/electric-vehicle-tipping-point"
            >
              'tipping point'
            </Link>{' '}
            in regards to mass adoption. A great resource that adequately
            describes the current problem surrounding electric vehicle charging
            infrastructure can be found{' '}
            <Link
              className="text-secondary"
              target="_blank"
              href="youtube.com/watch?v=pLcqJ2DclEg"
            >
              here
            </Link>
            .
          </div>
          <div>
            My current place of work, EVUp, aims at providing solutions to these
            problems, in particular via{' '}
            <Link
              className="text-secondary"
              target="_blank"
              href="https://charge.evup.com.au/ecommerce/"
            >
              EVUp Charge
            </Link>
            , which is a software I've contributed to since Feb 2022 and led
            since Oct 2022, that provides deep functionality for OCPP smart
            chargers while connecting drivers to their nearest charger. The
            functionality includes monetisation of these chargers for venues (or
            anyone who owns a charger, essentially) and providing information
            about usage and other monitoring features. It also offers dynamic
            load management for charging stations (see{' '}
            <Link
              className="text-secondary"
              target="_blank"
              href="https://www.evup.com.au/ev-charging-station-load-management"
            >
              BalanceUp
            </Link>
            ), which is what brought me to this problem.
          </div>
          <h1 className="text-2xl underline text-secondary">
            What is Load Management/Balancing?
          </h1>
          <div>
            One of the key problems faced in the process of expanding EV
            charging infrastructure, is the power load strained on the grid in
            doing so. Since electric vehicle chargers draw extensive amounts of
            power, most properties with multiple chargers installed are likely
            to draw more power from the grid than their local power company has
            allocated them, resulting in power outages (when the load drawn by
            the property exceeds what it is allocated, tripping the circuit
            breaker).
          </div>
          <div>
            This is particularly relevant for properties which intend on having
            chargers installed, but don't have their electrical infrastructure
            primed to be a charging station, which is the case for many places
            currently looking to install chargers - apartments, parking lots,
            city councils etc. Dynamic Load Management, also known as Dynamic
            Load Balancing, DLB or DLM, is the localised solution to this
            problem. It connects a group of chargers to a software which ensures
            they won't exceed the allocated amperage of the property, while also
            ensuring each charger is fairly distributed the most even amount of
            amperage possible. When a charger starts or stops being used, it
            will dynamically set each charger to draw an ideal amount of
            amperage based on their use and activity.
          </div>
          <div>
            A lot of people (including myself at first glance, being formerly
            unfamiliar with the workings of circuits) initially assume the
            solution is as straight forward as taking the property amperage,
            dividing it by the number of active chargers, assigning that to each
            charger, and moving on. Basic division, yielding an evenly
            distributed allocation. However{' '}
            <span className="underline">2 major limitations</span> are faced
            that convolute the problem significantly. Believe it or not,
            considering these limitations makes the solution much more
            complicated than mere division.
          </div>
          <div>
            Before exploring these, I should also add that while load management
            typically concerns balancing wattage (W) drawn by devices, we will{' '}
            <Link
              className="text-secondary"
              target="_blank"
              href="https://www.allaboutcircuits.com/textbook/direct-current/chpt-5/simple-parallel-circuits/"
            >
              assume that the chargers are in parallel, such that they have the
              same voltage (V)
            </Link>{' '}
            . Since W = I*V (known as Ohm's Law, where I = amperage), an equal
            voltage enables us to simply work in terms of amps. Note this is
            likely to be the case, as almost all home circuits are run in
            parallel to prevent one broken/off appliance disrupting the whole
            circuit. This is also convenient as{' '}
            <Link
              className="text-secondary"
              target="_blank"
              href="https://www.openchargealliance.org/protocols/ocpp-16/"
            >
              OCPP
            </Link>
            , the standard which enables us to set each charger power limits,
            also allows setting amperage limits instead.
          </div>
          <h1 className="text-lg underline text-secondary">Problem 1</h1>
          <div>
            Moving on, the first limitation is the mixing of three phase and
            single phase devices at a single location. Single phase electricity
            typically involves voltage being delivered at a rate which follows a
            single sine wave (hence the term alternating current or AC power).
            The voltage oscillates from positive to negative, and in turn the
            direction of the current also periodically changes. However most
            industrial electrical grids use standard 3 phase power, where
            instead of one alternating current (AC), it delivers 3 alternating
            currents which are shifted 120° as to be evenly spaced and deliver 3
            times the power. See below:
            <Image
              src="/assets/dlb/3phase1phase.gif"
              alt=""
              width={600}
              height={300}
              className="mx-auto my-4"
            />
            Note we have been discussing this problem in terms of amperage, but
            the display shows how the phases supply voltage, which might seem to
            obfuscate the problem with a new variable. But we can still ignore
            voltage for the moment, and simply move on with the knowledge that a{' '}
            <Link
              className="text-secondary"
              target="_blank"
              href="https://www.quora.com/A-3-phase-machine-takes-a-100-ampere-current-Each-phase-takes-how-much-ampere"
            >
              3 phase device looking to draw 100A will draw 100A from each phase
            </Link>
            , as an example of how amperage distribution across 3 phases works .
            This means that when allocating amperage to devices, we have to
            consider whether the allocation exceeds capacity of{' '}
            <span className="underline">any</span> of the 3 phases, rather than
            a holistic grid (at least, when any single phase chargers are also
            involved, otherwise it becomes the same).
          </div>
          <h1 className="text-lg underline text-secondary">Problem 2</h1>
          <div>
            Another limitation emerges when considering devices and ports.
            Often, each charger will have a couple of ports, which have their
            own allocations. The ports themselves have a maximum capacity they
            can use to charge a car, and on top of that, the devices themselves
            usually have a circuit amperage which must not be exceeded. We see a
            solution to this is more involved than mere division, as we need to
            respect all involved capacities.
          </div>
          <div>
            One may also be considering the factor of DC and AC chargers
            currently used to charge EV's, and whether mixing these necessitates
            any other considerations. Since DC chargers convert AC power to DC
            inside the charger,
          </div>
          <h1 className="text-2xl underline text-secondary">
            Modelling the problem
          </h1>
          <div>
            To create a model of the problem, and therefore find a solution,
            what every model needs is a set of assumptions from which it can
            build. The model should have a set of aims, and also a set of
            restrictions/assumptions.
          </div>
          <h1 className="text-lg underline text-secondary">Assumptions</h1>
          <div>
            We aim to:
            <ul className=" ml-6">
              <li>
                a) Allocate each active charging port the most evenly
                distributed amount of amperage
              </li>
              <li>
                b) Allocate each active charging port a maximal amount of
                amperage
              </li>
            </ul>
          </div>
          <div>
            Then the corresponding restrictions/assumptions on that aim are:
            <ul className="ml-6">
              <li>
                i) Chargers and ports within chargers are connected in parallel,
                such that we may work exclusively in amperage
              </li>
              <li>
                ii) Each device has a maximal circuit amperage to not be exceed
              </li>
              <li>
                iii) Each port of a device also has a seperate maximal circuit
                amperage to not be exceeded
              </li>
              <li>
                iv) Each AC phase from the grid supplies an equal amperage
              </li>
              <li>
                v) There can be any number of devices. A device can have any
                number of ports
              </li>
              <li>vi) Every port can readily have it's maximum amperage set</li>
            </ul>
          </div>
          <div>
            Certainly, this is a lot to consider, and could not be satisfied by
            any naive approach. With this, my immediate idea is that we must
            also find a way to represent a given DLB setup in this model, for
            the sake of getting a better intuition and interpretation of the
            problem. The obvious initial choice is to represent this as a tree,
            since it does appear we have these 'layers' of dependency (ports
            depend on devices, devices depend on phases, vise versa).
          </div>
          <h1 className="text-lg underline text-secondary">
            Example: Location A
          </h1>
          <div>
            As an example, consider a Location A with 60 amps supplied from the
            grid and 3 chargers:
            <ul className="list-disc ml-6">
              <li>
                A 3 phase device with max amperage 32A, an active port with max
                amperage 20A, another active port with max amperage 32A
              </li>
              <li>
                A single phase device connected to the second phase with max
                amperage 12A, 1 active port with max amperage 10A
              </li>
              <li>
                A single phase device connected to the third phase with max
                amperage 22A, an inactive port with max amperage 15A, an active
                port with max amperage 12A.
              </li>
            </ul>
          </div>
          <div>
            One should acknowledge that it is practically unlikely a charger
            will have ports with different max amperages (in fact they usually
            have the same max as the device). But we need to extend our model to
            all cases to ensure it will generalise well in the caprice of the
            real world. Nonetheless, describing Location A in the way we just
            have is in itself an example of why we need to represent this
            somehow else, writing it out is clearly far too verbose. Noting that
            phases 1, 2 and 3 are usually referred to as L1, L2, L3, that
            example could easily be represented by the following diagram:
          </div>
          <Image
            src="/assets/dlb/locationA-1.png"
            alt=""
            width={500}
            height={200}
            className="mx-auto"
          />
          <div>
            Note that this representation{' '}
            <span className="underline">does not</span> intend to or adequately
            represent the circuitry of the system, but rather the dependencies
            and restrictions on amperage in allocating a safe amount -
            essentially all the pieces relevant to the DLM problem. With this
            method of representing a location, therefore granting a data
            structure (the tree) for a location, we can finally move on to
            solving the problem.
          </div>
          <h1 className="text-2xl underline text-secondary">
            Solving The Model
          </h1>
          <div>
            We now need to use this tree structure to figure out what the
            optimal allocation is, or rather, an algorithm that does so. It
            should obviously involve allocating 0 amps to innactive chargers,
            but then allocating the most evenly distributed and maximal amount
            of amperage to every other charger. I will demonstrate 2 algorithms.
            The first of which is somewhat of a loose brute force approach that
            happens to be decently efficient for a particular scenario, but
            often inoptimal. The other is an optimised approach which I find
            rather beautiful, and frankly, is the reason I decided to write this
            article.
          </div>
          <h1 className="text-lg underline text-secondary">
            The Quick and Dirty Fix
          </h1>
          <div>
            Surprisingly, there is a fairly primitive algorithm that works
            exceptionally well <span className="underline">exclusively</span>{' '}
            for locations with devices that have large circuit capacities in
            proportion to the grid allocation. It simply involves:
          </div>
          <div>
            <ol className="list-decimal ml-5">
              <li>
                Finding the phase with the most active connectors attached to it
              </li>
              <li>
                Dividing the grid amperage by that number of active connectors
              </li>
              <li>
                Setting each active connector to the minimum of {'{'} that
                division result, it's port capacity, it's device capacity {'}'}.
              </li>
            </ol>
          </div>
          <div>ANIMATION</div>
          <div>
            This works because if we target the phase with the most active
            connectors (and each phase has the same amperage), dividing it's
            supply by the number of active connectors will certainly set out to
            allocate an amperage which won't exceed that phase. But because that
            phase has the most active connections, it certainly won't exceed the
            others too. So immediately, this algorithm respects the grid
            capacity. Since we minimum of that and the capacities of the branch
            a connector is on, we respect the capacities of everything.
          </div>
          <div>
            However, when we, for example, receive from the initial calculation
            to ideally allocate say 30A to each active connector, but two
            connectors can only be set to 22A, we have this leftover unusued 16A
            to give to the other active connectors. So we have to do some sort
            of 'extra pass' to donate this. But what if in reallocating that, we
            again allocate past some capacity and have leftover? We end up in
            this loop where we don't necessarily know at what step it would
            terminate.
          </div>
          <div>
            Iterating our way out of this mess until the allocation works would
            be bad practice in my opinion, we ideally want to gaurantee that the
            balanced load can be calculated in a deterministic amount of time -
            especially in the setting of big asynchronous software. Maybe you
            think writing some while loop that terminates eventually is fine. In
            a lot of settings it probably is, which is why this algorithm can be
            viable, but personally I'd rather something cleaner.
          </div>
          <div>ANIMATION</div>
          <div>
            We see this approach can result in large amounts of unallocated
            amperage if the device and connector capacity is far lower than what
            we initially attempted to allocate. Which is why I say it only works
            well if device and connector capacities happen to be quite high, as
            then it will be less likely there is unallocated amounts remaining.
            That solution would be perfect if there was no device and connector
            maximums, but there is. Luckily, we can find a cleaner approach.
          </div>
          <h1 className="text-lg underline text-secondary">
            The Tree Tipping Algorithm
          </h1>
          <div>
            The algorithm I wanted to share was one that strongly utilises the
            fact we represent this as a tree. When staring at the tree
            structure, a thought occurred to me that if each connector were a
            bucket, with it's volume equal to the maximum amperage it can safely
            be set, then pouring water from the top would evenly distribute
            across these buckets. If any of them overflowed, they just flow into
            one of the adjascent buckets. See below:
          </div>
          <div>ANIMATION</div>
          <div>
            In nature a tree will propagate water from it's roots, and have
            water pour down evenly from it's canopy. The reason I call this tree
            tipping is because in the first pass, we will traverse from the
            connectors to the phases to determine allocations, things are
            naturally flowing towards the top - the propagation step. After that
            all we have to do is let the water (amperage) be 'tipped' into the
            top and flow eventually into the connectors, determining their
            safely optimal allocation.
          </div>
          <div>
            What this step requires is that for each device, we create a vector
            of what amperage each connector is asking for. We then normalise it
            to have a sum equal to the device's max amperage. This way we find
            an allocation which does not exceed the capacity of the parent node,
            and is in perfect proportion to what amperage each connector is
            asking for.
          </div>
          <div>ANIMATION</div>
          <div>
            Now what's perfect about this is that connectors bear the same
            relationship to devices as devices do to the phase nodes, so we can
            just repeat that step recursively, for the whole tree. That is,
            after creating our device vector, we propagate to each phase the
            amperage each device is asking for, and normalise the sum to be
            equal to the grid amperage. See the whole propagation step visually
            below.
          </div>
          <div>IMAGE</div>
          <div>
            After this we simply let the tree do it's work, 'tipping' the
            amperage from the phases through the tree, having the water flow
            from the canopy (to continue our analogy). To do this across all
            phases, we could either A - do this for each phase seperately, or B
            - combine the phases and use the minimum allocation for each device.
            The problem with the first option is unnecessary complexity, the
            problem with the second is that we need to also record what
            allocation is for what connector, rather than just inferring them by
            their array position.
          </div>
        </div>
      </PostSummary>
    </div>
  )
}

export const EVChargerDLBSummary = () => {
  return (
    <PostSummary
      title="Dynamic Load Balancing for EV Chargers"
      isPageHeader={false}
      children={undefined}
      link="articles/EVChargerDLB"
      desc="A generalisable model to balance amperage distribution across a set of electric vehicle chargers, without exceeding a given grid capacity."
    />
  )
}

export default EVChargerDLB
