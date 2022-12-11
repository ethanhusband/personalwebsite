import PostSummary from '../components/PostSummary'
import Link from 'next/link'
import Image from 'next/image'

export const EVChargerDLB = () => {
  return (
    <div className="flex flex-col ">
      <PostSummary
        title="Dynamic Load Management for EV Chargers"
        link="/articles/EVChargerDLB"
        desc="Ethan Husband - DD/MM/YY"
      >
        <div className="flex flex-col gap-y-4">
          <h1 className="text-2xl underline text-secondary ">
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
          <h1 className="text-2xl underline text-secondary ">Preliminaries</h1>
          <div>
            Firstly, some preliminary knowledge around circuits, AC vs DC power
            and Single Phase vs Three phase power are required to elaborate. For
            those familiar, skip this section. What I will explain first here
            are the entry level details of electricity, starting with circuits
            and we'll build our way up from there. I, and many, often prefer to
            think of a circuit as water flowing through pipework, known as the{' '}
            <Link
              className="text-secondary"
              target="_blank"
              href="https://en.wikipedia.org/wiki/Hydraulic_analogy"
            >
              Hydraulic Analogy
            </Link>
            . I'm going to descibribe these concepts solely using the analogy,
            as it will be sufficient for what we're doing, and ends up being
            incredibly powerful in terms of conceptualising a solution.
          </div>
          <div>
            Firstly,{' '}
            <Link
              className="text-secondary"
              target="_blank"
              href="https://en.wikipedia.org/wiki/Ampere"
            >
              amperage
            </Link>{' '}
            is the unit which describes the rate at which electrical charge (or
            electrons) flow through a circuit. We can think of this as the
            volume of water flowing though pipework. Meanwhile,{' '}
            <Link
              className="text-secondary"
              target="_blank"
              href="https://en.wikipedia.org/wiki/Voltage"
            >
              voltage
            </Link>{' '}
            describes the difference in electrical potential between two points.
            We can think of voltage as the difference in water pressure between
            two points of the pipework. I found the illustration below to be
            particularly helpful.
          </div>
          <Image
            src="/assets/dlb/water-analogy-1.png"
            alt=""
            width={500}
            height={200}
            className="mx-auto border-2 border-black rounded"
          />
          <div>
            Finally,{' '}
            <Link
              className="text-secondary"
              target="_blank"
              href="https://en.wikipedia.org/wiki/Watt"
            >
              wattage
            </Link>
            , or power, is simply the result of multiplying amperage and
            voltage. In the context of the Hydraulic Analogy, I like to think of
            it as the amount multiplied by the rate, therefore being useful as
            the measure of total electrical power (water) being delivered.
            Wattage generally is used to describe the rate at which something is
            receiving electricity, particularly in the context of charging a
            car.
          </div>
          <div>
            There are two more final terms to introduce regarding circuits which
            are series and parellel. A circuit connected in series can be
            thought of as pipework consisting of a single pipe, while circuits
            running in parallel can be thought of as a pipe which splits into
            different branches.
          </div>
          <Image
            src="/assets/dlb/series-parallel.png"
            alt=""
            width={500}
            height={200}
            className="mx-auto border-2 border-black rounded"
          />
          <div>
            With this, there are also two forms that power can be delivered in,
            AC or DC. AC power is equivalent to water quickly oscillating back
            and forth in a pipe, while DC is equivalent to water being
            constantly pushed through a pipe (more intuitively). When I first
            heard this I thought, how are devices powered by AC power not
            constantly switching on and off then? Well AC power is significantly
            faster than DC (so much so that it is used in all industrial grids),
            and this change in direction is often so fast it does not matter.
            See{' '}
            <Link
              className="text-secondary"
              target="_blank"
              href="https://www.nde-ed.org/Physics/Electricity/alternatingcurrent.xhtml"
            >
              this resource here
            </Link>{' '}
            for a great short explanation.
          </div>
          <Image
            src="/assets/dlb/ac-dc.png"
            alt=""
            width={500}
            height={200}
            className="mx-auto border-2 border-black rounded"
          />
          <div>
            One final but important concept worth noting is that circuits which
            use AC power may use{' '}
            <Link
              className="text-secondary"
              target="_blank"
              href="https://www.fluke.com/en-us/learn/blog/power-quality/single-phase-vs-three-phase-power"
            >
              Single Phase or Three Phase power
            </Link>
            . Single phase electricity is the delivery of simple AC power as we
            know it, so at a rate which alternates and follows a single sine
            wave (hence the term alternating current or AC power, and the
            analogy of water oscillating in a pipe). The problem with this is
            that half the time, the current is travelling away from the
            direction you want it to go, which is inefficient. All industrial
            electrical grids (that deliver power to your home) account for this
            by using standard 3 phase power, where instead of one alternating
            current (AC), it cleverly delivers 3 alternating currents at the
            same time which are shifted 120° as to be evenly spaced and deliver
            3 times the power. See below:
          </div>

          <Image
            src="/assets/dlb/3phase1phase.gif"
            alt=""
            width={600}
            height={300}
            className="mx-auto border-2 border-black rounded"
          />
          <div>
            To accomodate this all buildings will have electricity coming in
            across 3 phases, known as L1, L2 and L3. Note we have been
            discussing this problem in terms of amperage, but the display shows
            how the phases supply voltage, which might seem to obfuscate the
            problem with a new variable, but just ignore it and know the same
            graph applies for amperage. As an example of how amperage is
            delivered to a 3 phase a home device, a{' '}
            <Link
              className="text-secondary"
              target="_blank"
              href="https://www.quora.com/A-3-phase-machine-takes-a-100-ampere-current-Each-phase-takes-how-much-ampere"
            >
              3 phase device looking to draw 100A will draw 100A from each L1,
              L2 and L3
            </Link>
            .
          </div>
          <div>
            That concludes the overview of electrical circuits needed. As for
            electric vehicle chargers themselves, all you really need to know is
            that they are a device often with many ports to charge from, and can
            come in AC or DC (exactly like an plug in your wall really).
          </div>
          <div>
            For those unfamiliar with all these concepts, it can be a lot to
            take in, coming from someone who didn't really know any of this
            before confronting the problem. It might be worth a reread or
            checking out the associated links if anything is still unclear, but
            any further nitpicking details regarding electricity shouldn't be
            necessary to know, just the general overview provided.
          </div>
          <h1 className="text-2xl underline text-secondary">
            What is Load Management/Balancing?
          </h1>
          <div>
            One of the key problems faced in the process of expanding EV
            charging infrastructure, is the power load strained on{' '}
            <Link
              href="https://en.wikipedia.org/wiki/Electrical_grid"
              className="text-secondary"
            >
              the electical grid
            </Link>{' '}
            and your the local property in doing so. With our constantly growing
            dependence on electricity, the stability of the grid is important
            for just about everything you can think of. As a result, power
            companies will often only allocate some specified amount of amperage
            to each property. Since electric vehicle chargers draw extensive
            amounts of power, most properties with multiple chargers installed
            are likely to draw more amperage from the grid than their local
            power company has allocated them. As a result, electric vehicle
            chargers frequently cause power outages (when the load drawn by the
            property exceeds what it is allocated, tripping the local{' '}
            <Link
              href="https://en.wikipedia.org/wiki/Circuit_breaker"
              className="text-secondary"
            >
              circuit breaker
            </Link>{' '}
            - which I'm sure we've all experienced before) which can be
            obviously problematic for a variety of reasons.
          </div>
          <div>
            This is particularly relevant for properties which intend on having
            chargers installed, but don't have their electrical infrastructure
            primed to be a charging station, which is the case for many places
            looking at installing many chargers - apartments, parking lots, city
            councils etc. Dynamic Load Management, also known as Dynamic Load
            Balancing, DLB or DLM, is the localised solution to this problem. It
            connects a group of chargers to a software which ensures they won't
            exceed the allocated <span className="underline">amperage</span> of
            the property, as to be safe. Meanwhile, also ensuring each charger
            is fairly allocated the most evenly distributed amount of{' '}
            <span className="underline">wattage</span> possible, as to guarantee
            they all provide a fairly equal amount of power to those charging.
            When a charger starts or stops being used, it will dynamically set
            each charger to draw an ideal amount of power based on their use and
            activity.
          </div>
          <div>
            A lot of people (including myself at first glance, being formerly
            unfamiliar with the workings of circuits) initially assume the
            solution is as straight forward as taking the property amperage,
            dividing it by the number of active chargers, assigning that to each
            charger, and moving on. Basic division, yielding an evenly
            distributed allocation. However{' '}
            <span className="underline">3 major limitations</span> are faced
            that convolute the problem significantly. Believe it or not,
            considering these limitations makes the solution much more
            complicated than mere division.
          </div>
          <h1 className="text-lg underline text-secondary">Problem 1</h1>
          <div>
            The first limitation is the mixing of three phase and single phase
            devices (at a location with 3 phase power). When allocating amperage
            to devices, we have to consider whether the allocation exceeds
            capacity of <span className="underline">any</span> of the 3 phases,
            rather than a single source (at least, when any single phase
            chargers are also involved, otherwise it becomes the same).
          </div>
          <h1 className="text-lg underline text-secondary">Problem 2</h1>
          <div>
            Another limitation emerges when considering devices and ports.
            Often, each charger will have a couple of ports, which get allocated
            some amperage. The ports themselves have a maximum amperage they can
            safely use to charge a car, and on top of that, the devices
            themselves usually have a maximum circuit amperage which too must
            not be exceeded. We see a solution to this is more involved than
            mere division, as we need to respect all involved capacities.
          </div>
          <h1 className="text-lg underline text-secondary">Problem 3</h1>
          <div>
            The final limitation to consider is that we are trying to get
            balanced distribution of wattage, not amperage, such that everyone
            charging has the most similar charge rate achievable, thus being
            fair. Remember wattage is amperage times voltage (W=I*V). The good
            thing is that in local property circuits, almost always devices are
            connected in parallel. Now if we think about this in terms of our
            water analogy, this was like splitting the pipework in two. In such
            a case, the volume (amperage) will split, but the pressure (voltage)
            would stay the same, therefore{' '}
            <Link
              className="text-secondary"
              target="_blank"
              href="https://www.allaboutcircuits.com/textbook/direct-current/chpt-5/simple-parallel-circuits/"
            >
              we may assume that the chargers have the same voltage (V)
            </Link>
            . Hence at the device level, all we really need to think about is
            how we distribute amperage. However, within a device itself things
            get more complicated. Electric vehicle chargers can be AC or DC, and
            DC devices after converting the AC power they are given to DC, often
            apply a large voltage to provide more power to the car. So we need
            to account for the voltage they apply in terms of balancing the
            wattage of active connectors.
          </div>
          <div>
            Thus we see that to even consider solving these load management
            problems we always need the property circuit breaker amperage,
            property voltage and property devices - including what phases they
            are attached to, what their maximum amperage is as well as their
            connectors and connector maximum amperages.
          </div>
          <h1 className="text-2xl underline text-secondary">
            Modelling the problem
          </h1>
          <div>
            Personally, I think there's a lot to think about in terms of
            approaching this. Firstly, we should list set of aims, and also a
            set of restrictions/assumptions, so the outline of what we're trying
            to do can all be in one place.
          </div>
          <h1 className="text-lg underline text-secondary">Assumptions</h1>
          <div>
            We aim to:
            <ul className=" ml-6">
              <li>
                a) Allocate each active charging port the most evenly
                distributed amount of power
              </li>
              <li>
                b) Allocate each active charging port a maximal amount of power
              </li>
              <li>c) Respect all amperage capacities</li>
            </ul>
          </div>
          <div>
            Then the corresponding restrictions/assumptions on that aim are:
            <ul className="ml-6">
              <li>i) Devices are connected in parallel</li>
              <li>ii) Each device has a maximal circuit amperage</li>
              <li>
                iii) Each port of a device also has a seperate maximal circuit
                amperage
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
            Certainly, this is still a lot to consider, and could not be
            satisfied by any naive approach. Thinking about each phase, device,
            connector and constraint at the same time is most likely too
            straining on short-term memory to make any real progress trying to
            solve, at least I find. With this, my immediate idea is that we must
            find a way to represent a given DLB setup, for the sake of getting a
            better intuition and interpretation of the problem. The obvious
            initial choice is to represent this as a tree, since it does appear
            we have these 'layers' of dependency (ports depend on devices,
            devices depend on phases, vise versa).
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
            One should acknowledge that it is, in practice, unlikely a charger
            will have ports with different max amperages (in fact they usually
            have the same max as the device). But we need to extend our model to
            all cases to ensure it will generalise well in the caprice of the
            real world. Nonetheless, describing Location A in the way we just
            have is in itself an example of why we need to represent this
            somehow else, writing it out is clearly far too verbose. We can
            instead model that example easily by representing it with the
            following diagram:
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
            The Trickling Algorithm
          </h1>
          <div>
            While this algorithm can be explained quite easily to programmers or
            computer scientists, I want to explain it in a way that too
            demonstrates the discrete thinking involved in coming up with such a
            method, as to be accessible to all. One of my main goals of this
            website is to illustrate a truth I've discovered that complex
            solutions to problems can be arrived at by anyone - just by thinking
            about the problem in a simpler, more accessible way, rather than
            trying to solve it by searching for some complex, mentally straining
            stroke of brilliance.
          </div>
          <div>
            The algorithm I wanted to share was one that strongly utilises the
            fact we represent these scenarios as a tree. When staring at the
            tree structure, a somewhat tangential thought occurred to me that if
            a real tree had a perfectly rounded canopy, water would trickle down
            the top in a perfectly even manner each. Now that would yield an
            even distribution, kind of like we want here.
          </div>
          <div>
            connector were a bucket, with it's volume equal to the maximum
            amperage it can safely receive, then pouring water from the top
            would evenly distribute across these buckets - that is naturally
            what it does assuming the slope is the same in all directions.
            Furthermore, if sibling connectors
          </div>
          <div>ANIMATION</div>
          <div>
            We have the intuition of a solution, we just have to formalise it
            now, so that it is programmable. Our program will need to know In
            nature a tree will propagate water from it's roots, and have water
            pour down evenly from it's canopy. The reason I call this tree
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
            from the canopy (to continue our analogy) through to the bottom
            layer. Since each phase was passed a 0
          </div>
          <div>
            For those wondering, we can set the amperage drawn by each connector{' '}
            <Link
              className="text-secondary"
              target="_blank"
              href="https://www.openchargealliance.org/protocols/ocpp-16/"
            >
              OCPP
            </Link>
            , the standard which enables EV smart charger communications abide
            by.
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
