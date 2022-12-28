import PostSummary from '../components/PostSummary'
import Image from 'next/image'
import Link from 'next/link'
import { SiteLink } from '../components/SiteLink'

export const EVChargerDLB = () => {
  return (
    <div className="flex flex-col ">
      <PostSummary
        title="Load Balancing for EV Charging Stations"
        link="/articles/EVChargerDLB"
        desc="Ethan Husband - DD/MM/YY"
      >
        <div className="flex flex-col gap-y-4">
          <h1 className="text-2xl text-secondary underline">Summary</h1>
          <div>
            In this article, I will be demonstrating (at a level of detail
            understandable for everyone) my algorithm for electric vehicle
            charging stations, which determines an load management allocation
            which is safe, and distributes current optimally in proportion to
            the power of devices. In a seperate article, I'll also provide an
            alternative algorithm which allocates amperage in a manner which is
            safe and instead distributes current to devices such that each
            charger delivers as equal an amount of power as possible. Note this
            solves a single iteration of dynamic load management. If you don't
            know what any of that means, all will be explained.
          </div>
          <div>
            For software developers who understand the problem, the{' '}
            <SiteLink href="https://github.com/ethanhusband/personalwebsite/blob/main/pages/notes/DLBArticle">
              source code of this algorithm can be found here
            </SiteLink>
            .
          </div>
          <h1 className="text-2xl underline text-secondary ">
            Context: The Charging Problem
          </h1>
          <div className="flex flex-col gap-y-4">
            <div>
              In the rapidly growing electric vehicle industry, the importance
              of accessible and reliable charging infrastructure is vital to a
              complete transition from combustion vehicles. Charging, whether it
              be infrastructure, batteries, the capacities of chargers, is often
              cited as the biggest problem holding back electric vehicles from
              reaching the{' '}
              <SiteLink href="https://www.energymonitor.ai/sectors/automotive/electric-vehicle-tipping-point">
                'tipping point'
              </SiteLink>{' '}
              in regards to mass adoption. A great resource that adequately
              describes the current problem surrounding electric vehicle
              charging infrastructure can be found{' '}
              <SiteLink href="youtube.com/watch?v=pLcqJ2DclEg">here</SiteLink>.
            </div>
            <Image
              src="/assets/dlb/charging-station.jpg"
              alt=""
              width={550}
              height={200}
              className="mx-auto border border-black rounded"
            />
            <div>
              My current place of work, EVUp, aims at providing solutions to
              these problems, in particular via{' '}
              <SiteLink href="https://charge.evup.com.au/ecommerce/">
                EVUp Charge
              </SiteLink>
              . EVUp Charge is a software I've contributed to since Feb 2022 and
              led since Oct 2022, that provides deep functionality for{' '}
              <SiteLink href="https://www.openchargealliance.org/protocols/ocpp-16/">
                OCPP
              </SiteLink>{' '}
              electric vehicle chargers, while also connecting drivers to their
              nearest charger. For those who own chargers, the software enables
              monetisation, authorisation and various monitoring features for
              each charger. It also offers{' '}
              <SiteLink href="https://www.evup.com.au/ev-charging-station-load-management">
                dynamic load balancing
              </SiteLink>{' '}
              (I'll elaborate on the details of what that is soon) for charging
              stations, which is what brought me to this problem.
            </div>
          </div>
          <h1 className="text-2xl underline text-secondary ">Preliminaries</h1>

          <div className="flex flex-col gap-y-4">
            <div>
              To elaborate further on load balancing, and why it is so
              important, there are a few concepts I have to explain first.
              Unless specified otherwise, I aim to make the majority of the
              articles on this website accessible to everyone, in terms of
              prerequisite knowledge - this is one of them! This preliminary
              concepts section should quickly explain from a beginner level some
              core background ideas I myself actually had to learn to understand
              dynamic load balancing.
            </div>
            <h1 className="text-lg underline text-secondary">
              Electricity and Circuits
            </h1>
            <div>
              Firstly, some entry-level details about electricity and circuits I
              had to teach myself (and hopefully, I can teach you) to grasp the
              problem are necessary. What I will explain here are the short and
              simple concepts - hopefully I've made the level of detail
              accessible for those unfamiliar, as I had to do so for myself.
            </div>
            <div>
              I (and many) often find it easier to think of a circuit as water
              flowing through pipework, instead of electrons flowing through
              wires, known usefully as the{' '}
              <SiteLink href="https://en.wikipedia.org/wiki/Hydraulic_analogy">
                Hydraulic Analogy
              </SiteLink>
              . I'm going to describe these concepts solely using the analogy,
              as it will be sufficient for what we're doing, and ends up being
              incredibly powerful in terms of conceptualising a solution.
            </div>
            <div>
              Firstly,{' '}
              <SiteLink href="https://en.wikipedia.org/wiki/Ampere">
                amperage
              </SiteLink>{' '}
              , also known as current, is the unit which describes the rate at
              which electrical charge (lots of electrons) flow through a
              circuit. We can think of this as the volume of water flowing
              though some pipework. Meanwhile,{' '}
              <SiteLink href="https://en.wikipedia.org/wiki/Voltage">
                voltage
              </SiteLink>{' '}
              we can think of as the difference in water pressure between two
              points of the pipework. What this actually corresponds to is the
              difference in electrical potential (energy required to move
              electrons) between two points. I found the illustration below to
              be particularly helpful.
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
              <SiteLink href="https://en.wikipedia.org/wiki/Watt">
                wattage
              </SiteLink>
              , or power, is simply the result of multiplying amperage and
              voltage. In the context of the Hydraulic Analogy, I like to think
              of it as the volume of water multiplied by the rate of flow,
              therefore being useful as a measure of the amount of water being
              delivered through the pipework over time. Bringing it back to
              electricity, wattage generally is used to describe the rate at
              which something is receiving electricity, particularly in the
              context of charging a car.
            </div>
            <div>
              There are two more key terms to introduce regarding circuits which
              are <span className="underline">series</span> and{' '}
              <span className="underline">parallel</span>. A circuit connected
              in series can be thought of as pipework consisting of a single
              pipe, while circuits running in parallel can be thought of as a
              pipe which splits off into different branches at any point.
            </div>
            <Image
              src="/assets/dlb/series-parallel.png"
              alt=""
              width={500}
              height={200}
              className="mx-auto border-2 border-black rounded"
            />
            <div id="kirchhoff">
              One thing worth noting which continues our analogy, is that for
              any circuit which runs in parallel, splitting the 'pipework' into
              multiple different branches would mean the volume of water in each
              branch will a portion of what it was before splitting - it has to
              be right? But the pressure in those branches would stay the same -
              we are still pumping through water at the same rate. Similarly, in
              a parallel circuit, when the circuit splits into multiple
              directions, the amperage too splits across those branches - while
              the voltage stays the same. This is known as Kirchhoff's Law.
            </div>
            <Image
              src="/assets/dlb/kirchhoff.webp"
              alt=""
              width={500}
              height={200}
              className="mx-auto border-2 border-black rounded"
            />
            <h1 className="text-lg underline text-secondary">Power Delivery</h1>
            <div>
              With this, there are also two forms that power can be delivered
              in, AC or DC. AC power is equivalent to water quickly oscillating
              back and forth in a pipe, while DC is equivalent to water being
              constantly pushed through a pipe (more intuitively). When I first
              heard this I thought, how are devices powered by AC power not
              constantly switching on and off then? Well AC power is
              significantly faster than DC (so much so that it is used in all
              industrial grids), and this change in direction is often so fast
              it does not matter. See{' '}
              <SiteLink href="https://www.nde-ed.org/Physics/Electricity/alternatingcurrent.xhtml">
                this resource here
              </SiteLink>{' '}
              for a great short explanation.
            </div>
            <Image
              src="/assets/dlb/ac-dc.png"
              alt=""
              width={500}
              height={200}
              className="mx-auto border-2 border-black rounded"
            />
            <div id="3phasesection">
              One final but important concept worth noting is that circuits
              which use AC power may use{' '}
              <SiteLink href="https://www.fluke.com/en-us/learn/blog/power-quality/single-phase-vs-three-phase-power">
                Single Phase or Three Phase power
              </SiteLink>
              . Single phase electricity is the delivery of simple AC power as
              we know it so far, so it alternates direction and as a result,
              voltage follows a single sine wave as the "high pressure" points
              are always alternating (hence the term alternating current or AC
              power, and the analogy of water oscillating in a pipe). The
              problem with this is that half the time, the current is travelling
              away from the direction you want it to go, which is inefficient.
              All industrial electrical grids (that deliver power to your home)
              account for this by using standard 3 phase power, where instead of
              one alternating current, it cleverly delivers 3 alternating
              currents simultaneously, but they are evenly spaced across time to
              deliver 3 times the power. See below:
            </div>
            <Image
              src="/assets/dlb/3phase1phase.gif"
              alt=""
              width={600}
              height={300}
              className="mx-auto border-2 border-black rounded"
            />
            <div>
              As a result, many buildings will have electricity delivered in
              across 3 phases, each phase being known as L1, L2 and L3. One
              confusing question I first asked myself when I heard this, if a
              device draws power from all 3 phases and overall needs 100 watts,
              does it draw 100 watts from each or 33.3 watts from each? As it
              happens, a{' '}
              <SiteLink href="https://www.quora.com/A-3-phase-machine-takes-a-100-ampere-current-Each-phase-takes-how-much-ampere">
                3 phase device looking to draw 100 watts will draw a maximum of
                100 watts from each L1, L2 and L3
              </SiteLink>
              . This is because of how the phases are evenly spaced out to have
              the least overlap possible (as seen in the graph above), never
              delivering more than 100 watts to the device if 100 watts is
              delivered at the peak of each phase.
            </div>

            <h1 className="text-lg underline text-secondary">
              Electric Vehicle Chargers
            </h1>
            <div>
              As for electric vehicle chargers themselves, all you really need
              to know is that they are an outlet, often with many ports to
              charge from (exactly like an plug in your wall really). Some
              chargers use AC power, some use DC power. Since electrical power
              supplied from the grid is delivered in AC (as mentioned), DC power
              chargers will convert the AC power they receive into DC power
              inside them. I don't claim to know how - fortunately that won't be
              relevant. AC chargers can make use of a single phase or all 3
              phases.
            </div>
            <div>
              For those wondering, we can actually set the amperage drawn by
              each connector from the grid. We do this using{' '}
              <SiteLink href="https://www.openchargealliance.org/protocols/ocpp-16/">
                OCPP
              </SiteLink>
              , the standard which many EV smart charger communications abide
              by. However, a disclaimer that whatever amperage we set with OCPP
              will result the charger in drawing that amount from{' '}
              <span className="underline">all</span> connected phases.
            </div>
            <div>
              For those unfamiliar with all these concepts, it can be a lot to
              take in, particularly coming from someone who didn't properly know
              any of this before confronting the problem. It might be worth a
              reread or checking out the associated links if anything is still
              unclear, but any further nitpicking details regarding electricity
              shouldn't be necessary to know, just the general overview
              provided.
            </div>
          </div>
          <h1 className="text-2xl underline text-secondary">
            What is Load Balancing/Management?
          </h1>
          <div className="flex flex-col gap-y-4">
            <div>
              One of the key problems faced in the process of expanding EV
              charging infrastructure, is the power strain on{' '}
              <SiteLink href="https://en.wikipedia.org/wiki/Electrical_grid">
                the electical grid
              </SiteLink>{' '}
              and your the local property in doing so. With our constantly
              growing dependence on electricity, the stability of the grid is
              important for just about everything you can think of. As a result,
              power companies will often only allocate some specified amount of
              amperage to each property. Since electric vehicle chargers draw
              extensive amounts of power, most properties with multiple chargers
              installed are likely to draw more amperage from the grid than
              their local power company has allocated them. As a result,
              electric vehicle chargers frequently cause power outages (when the
              load drawn by the property exceeds what it is allocated, tripping
              the local{' '}
              <SiteLink href="https://en.wikipedia.org/wiki/Circuit_breaker">
                circuit breaker
              </SiteLink>{' '}
              - which I'm sure we've all experienced before) which can be
              obviously problematic for a variety of reasons.
            </div>
            <div>
              This is particularly relevant for properties which intend on
              having chargers installed, but don't have their electrical
              infrastructure primed to be a charging station, which is the case
              for many places currently looking at installing multiple chargers
              - city councils, apartments, parking lots etc. Dynamic Load
              Balancing (DLB), also known as Dynamic Load Management (DLM), is
              the localised solution to this problem. It connects a group of
              chargers to a software which ensures they won't exceed the
              allocated <span className="underline">amperage</span> of the
              property, as to be safe. The "dynamic" part of DLB refers to
              whenever a charger starts or stops being used, or the allocated
              amperage changes, the software will recalculate what amount of
              amperage each charger is allocated, or rather, can safely draw
              from the home circuit. Fortunately this part is easy, as that just
              ultimately involves sending the updates to a computer, and the
              computer sending them back to the chargers. The "load management"
              part refers to how we actually calculate this, and is more
              involved - figuring out how this should work will be the main
              focus of this article.
            </div>
            <div>
              One thing I should mention is that this article will focus on
              finding a load management algorithm which distributes power in a
              manner which is <span>safe</span> and{' '}
              <span>uses as much amperage as possible</span>. In the next
              article, this will be taken a step further and we will aim to find
              an algorithm which, on top of those two things, ensures the load
              management system finds the{' '}
              <span className="underline">
                most evenly distributed amount of wattage
              </span>{' '}
              possible, as to guarantee each charger provides the most closely
              equal amount of power possible to those charging - granting
              fairness. But for now forget about that, we just want something
              that is safe and makes the most of the limited amperage the power
              company has given us.
            </div>
            <div>
              A lot of people (including myself at first glance, being formerly
              unfamiliar with the workings of circuits) initially assume the
              solution could be as straight forward as taking the amperage of
              the circuit breaker, dividing it by the number of active chargers,
              setting each charger to draw that amount, and moving on. Basic
              division, even yielding an evenly distributed allocation. However{' '}
              <span className="underline">2 major limitations</span> are faced
              that convolute the problem. Believe it or not, considering these
              limitations makes the solution much more complicated than mere
              division.
            </div>
            <h1 className="text-lg underline text-secondary">Problem 1</h1>
            <div>
              The first limitation is the mixing of three phase and single phase
              devices (assuming a location uses 3 phase power). When allocating
              amperage to devices, we have to consider whether the allocation
              exceeds capacity of <span className="underline">any</span> of the
              3 phases, rather than a single source. This is only a problem when
              putting single phase chargers on 3 phase property circuits,
              because if you look at the{' '}
              <Link
                href="/articles/EVChargerDLB#3phasesection"
                className="text-secondary hover:underline"
              >
                3 phase graph again
              </Link>
              , one of these peaks will be imbalanced with the others when we
              have an additional device connected to it. If we have just 3 phase
              devices or just single phase devices, this wouldn't be an issue
              because we wouldnt have to consider each phase seperately - we
              could effectively ignore two of them.
            </div>

            <h1 className="text-lg underline text-secondary">Problem 2</h1>
            <div>
              Another limitation emerges when considering the circuits of the
              devices and ports themselves. Often, each charger will have a
              couple of ports, which get allocated some share of the amperage
              given to the charger. The ports themselves have a maximum amperage
              they can safely use to charge a car, and on top of that, the
              devices themselves usually have a maximum circuit amperage which
              too must not be exceeded. We see now that on top of respecting the
              phase capacities, as we need to respect also the devices' circuit
              capacities.
            </div>

            <div>
              So we have a bit to think about. Whenever I get faced with a
              problem like this, the first thing I like to think is what
              information do we need? To even consider solving these load
              management problems we will always definitely need the maximum
              amperage to allocate to all the chargers (for example, the limit
              set by the circuit breaker), as well the devices at the station -
              including what phases they are attached to, what their maximum
              amperage is, what connectors they have and what the maximum
              amperage of their connectors.
            </div>
          </div>
          <h1 className="text-2xl underline text-secondary">
            Breaking Down The Problem
          </h1>
          <div className="flex flex-col gap-y-4">
            <div>
              Personally, I think we still need to break this whole thing down
              into something more digestible. How this will be solved is still
              fairly out of sight right now, in my opinion. Maybe for the sake
              of thinking about it a bit more before jumping in, we should list
              out a set of aims, and also a set of restrictions/assumptions for
              this problem, so the outline of what we're trying to do can all be
              in one place.
            </div>
            <h1 className="text-lg underline text-secondary">Assumptions</h1>
            <div>
              We aim to:
              <ul className="ml-2">
                <li>
                  a) Allocate each active charging port a maximal amount of
                  power
                </li>
                <li>b) Respect all amperage capacities</li>
              </ul>
            </div>
            <div>
              Then the restrictions/assumptions we have are:
              <ul className="ml-6 list-disc">
                <li>
                  Devices are connected in parallel, therefore{' '}
                  <Link
                    href="/articles/EVChargerDLB#kirchhoff"
                    className="text-secondary hover:underline"
                  >
                    Kirchhoff's Law
                  </Link>{' '}
                  applies
                </li>
                <li>
                  Hence, the devices connected to a phase can't draw more
                  current than the phase supplies
                </li>
                <li>
                  Each device has a maximal circuit amperage to be respected
                </li>
                <li>
                  Each port of a device also has a seperate maximal amperage to
                  respectected
                </li>
                <li>
                  Each AC phase from the grid supplies the same amount amperage
                  to the station
                </li>
                <li>
                  There can be any number of devices. A device can have any
                  number of ports
                </li>
                <li>Every port can readily have it's maximum amperage set</li>
              </ul>
            </div>
            <div>
              One more step I always think is absolutely necessary (especially
              in the context of creating algorithms) is to find a visual
              representation for any possible instance of the problem, in this
              case an 'instance of the problem' referring to a station. We want
              to represent a given station setup, which includes all the
              necessary information. A lot of people claim to be visual learners
              - you can benefit a lot from creating your own visual instead of
              struggling to find one, like so;
            </div>
            <h1 className="text-lg underline text-secondary">
              Example: Location A
            </h1>
            <div>
              The obvious initial choice is to represent this as a tree, since
              it does appear we have these 'layers' of dependency - in the sense
              that a device has multiple "child" ports which is distributes its
              amperage to, and phases have multiple "child" devices with the
              same relationship.
            </div>
            <div>
              As an example, we consider a Location A which has 60 amps supplied
              by the grid and 3 chargers which are:
              <ul className="list-disc ml-6">
                <li>
                  A 3 phase device with max amperage 32A. One active port with
                  max amperage 20A, another active port with max amperage 32A
                </li>
                <li>
                  A single phase device (connected to L2) with max amperage 12A.
                  One sole active port with max amperage 10A
                </li>
                <li>
                  A single phase device (connected to L3) with max amperage 22A,
                  an inactive port with max amperage 15A, an active port with
                  max amperage 12A.
                </li>
              </ul>
            </div>
            <div>
              I should acknowledge that it is, in practice, unlikely a charger
              will have ports with different max amperages (in fact, they
              usually have the same max as the device). But we need to extend
              our model to all cases to ensure it will generalise well in the
              caprice of the real world. That being said, with my basic
              understanding of circuits there may be factors I haven't
              considered - my goal here though is to create a model of the
              situation, and find a solution to that.
            </div>
            <div>
              Nonetheless, describing Location A in the way we just have is in
              itself an example of why we need to represent this somehow else,
              writing it out is clearly verbose. We can instead model that
              example easily by representing it with the following diagram:
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
              <span className="underline">does not</span> intend to (or
              adequately) represent the circuitry of the system, but rather the
              dependencies and restrictions on amperage in allocating a safe
              amount - essentially all the pieces relevant to the safe DLM
              problem. With this way of representing a location, therefore
              granting a data structure (the tree) for a location, we can
              finally move on to solving the problem. In a way it's given us an
              entry point, because now we realise we just need to think about
              how devices and phases should safely distribute their amperage as
              independent object - breaking it down one more step.
            </div>
          </div>
          <h1 className="text-2xl underline text-secondary">
            Solving The Model
          </h1>
          <div className="flex flex-col gap-y-4">
            <div>
              We now need to use this tree structure to figure out what the
              optimal safe allocation is, or rather, an algorithm that does so.
            </div>
            <div>
              As a starting point, the algorithm we derive should obviously
              involve allocating 0 amps to innactive chargers, but then
              allocating the rest of the power such that the proportion given to
              devices which require more power is more than those which need
              less. There needs to also be no remaining current to allocate,
              such as what would happen for example if we just set every
              connector to draw 1A, a probably-safe but inefficient amount.
            </div>
            <h1 className="text-lg underline text-secondary">
              The "I Gotta Ask My Dad" Algorithm
            </h1>
            <div>
              While this algorithm for proportional load balancing can be
              explained quite easily to programmers or computer scientists, like
              much of this article I want to explain it in a way that
              demonstrates the discrete thinking involved in coming up with such
              a method, as to be accessible to all - so I found an analogy we're
              all familiar with.
            </div>
            <div>
              For those with siblings, or even cousins, we've all been in a
              position where you both want a certain amount of something, let's
              say it's cake, but there's only so much to go around. One sibling
              says "I want 2 slices of cake", and the other says "I want 4
              slices of cake". Their parents then distribute what's available,
              in proportion to how much each sibling wants. If there's 3 slices
              of cake available, the parent would give 1 slice to sibling 1, and
              2 slices to sibling 2 - distributing in proportion, exactly like
              what we want to do with our amperage.
            </div>
            <div>
              This algorithm uses the exact same idea. Each active
              connector/port wants to draw as much amperage as possible, but
              before it does, it has to ask the parent node in dependency tree,
              then can use what it's given by that node. The steps involved are:
            </div>
            <div>
              <ol className="list-disc ml-8">
                <li>
                  For each device, make a list of what amperage each of it's
                  connectors will maximally draw (set to 0 if the connector is
                  not being used) - equivalent to "how much cake the sibling
                  wants"
                </li>
                <li>
                  Calculate the total amperage all the sibling connectors are
                  asking for. For each number in that list, multiply it by (the
                  devices maximum amperage / the total amperage you just
                  calculate) - now each connector's proportional share is
                  determines. But wait, it shouldn't tell the connectors yet,
                  now the device has to "ask it's dad" whether it can draw the
                  device maximum.
                </li>
                <li>
                  For each phase, make a list of the amperage requested by every
                  attached device. The amperage requested should be the sum of
                  the device's allocation list - the amount it needs to give to
                  it's children (charging ports)
                </li>
                <li>
                  Again, calculate the sum of that list. For each number in that
                  list, multiply it by (the grid amperage / the sum of the list)
                  - giving the proportion each device can receive.
                </li>
                <li>
                  Now for each phase, tell the device what it is allocated, but{' '}
                  <span className="underline">only</span> if it is less than
                  what it was asking for. This way we end up ensuring we take
                  the <span className="underline">minimum</span> allocation
                  decided by the phases.
                </li>
                <li>
                  For each device, recalculate it's connector proportions, with
                  what the device was just allocated by it's phases. By this, I
                  mean repeat the process of multiplying each connector
                  allocation in our old list by (the amount we were told we can
                  use by the phase / the previous sum of the list)
                </li>
                <li>
                  Tell each connector what it is allocated - finally give the
                  siblings the proportion of what they asked for
                </li>
              </ol>
            </div>
            <div>
              For location A, the following gif summarises the entire process
              visually as a nice final product:
            </div>
            <div>IMAGE</div>
          </div>
          <h1 className="text-lg underline text-secondary">Conclusion</h1>
          <div>
            While this algorithm could be considered simple and repetitive, this
            article sets the groundwork for the more involved computer-sciency
            algorithm in the next article, which achieves the more final goal of
            finding the allocation which instead distributes <span>power</span>{' '}
            as evenly as possible - ensuring every person charging is getting as
            fair a share of the station's electricity as the next. Hopefully
            this was instructive, if anything was unclear feel free to comment.
          </div>
        </div>
      </PostSummary>
    </div>
  )
}

export const EVChargerDLBSummary = () => {
  return (
    <PostSummary
      title="Load Balancing for EV Charging Stations"
      isPageHeader={false}
      children={undefined}
      link="articles/EVChargerDLB"
      desc="A generalisable model to safely distribute amperage across a set of electric vehicle chargers, without exceeding circuit capacities."
    />
  )
}

export default EVChargerDLB
