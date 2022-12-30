import PostSummary from '../../components/PostSummary'
import Image from 'next/image'
import Link from 'next/link'
import { EditThis } from '../../components/SectionToEdit'
import { SiteLink } from '../../components/SiteLink'

export const FairEVChargerDLB = () => {
  return (
    <div className="flex flex-col ">
      <PostSummary
        title="Load Balancing for EV Charging Stations"
        link="/articles/EVChargerDLB"
        desc="Ethan Husband - DD/MM/YY"
      >
        <EditThis>
          <div className="flex flex-col gap-y-4">
            <h1 className="text-2xl underline text-secondary ">
              Context: The Charging Problem
            </h1>
            <div className="flex flex-col gap-y-4">
              <div>
                In the rapidly growing electric vehicle industry, the importance
                of accessible and reliable charging infrastructure is vital to a
                complete transition from combustion vehicles. Charging, whether
                it be infrastructure, batteries, the capacities of chargers, is
                often cited as the biggest problem holding back electric
                vehicles from reaching the{' '}
                <SiteLink href="https://www.energymonitor.ai/sectors/automotive/electric-vehicle-tipping-point">
                  'tipping point'
                </SiteLink>{' '}
                in regards to mass adoption. A great resource that adequately
                describes the current problem surrounding electric vehicle
                charging infrastructure can be found{' '}
                <SiteLink href="youtube.com/watch?v=pLcqJ2DclEg">here</SiteLink>
                .
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
                . EVUp Charge is a software I've contributed to since Feb 2022
                and led since Oct 2022, that provides deep functionality for{' '}
                <SiteLink href="https://www.openchargealliance.org/protocols/ocpp-16/">
                  OCPP
                </SiteLink>{' '}
                electric vehicle chargers, while also connecting drivers to
                their nearest charger. For those who own chargers, the software
                enables monetisation, authorisation and various monitoring
                features for each charger. It also offers{' '}
                <SiteLink href="https://www.evup.com.au/ev-charging-station-load-management">
                  dynamic load balancing
                </SiteLink>{' '}
                (I'll elaborate on the details of what that is soon) for
                charging stations, which is what brought me to this problem.
              </div>
            </div>
            <h1 className="text-2xl underline text-secondary ">
              Preliminaries
            </h1>

            <div className="flex flex-col gap-y-4">
              <div>
                To elaborate further on load balancing, and why it is so
                important, there are a few concepts I have to explain first.
                Unless specified otherwise, I aim to make the majority of the
                articles on this website accessible to everyone, in terms of
                prerequisite knowledge - this is one of them! This preliminary
                concepts section should quickly explain from a beginner level
                some core background ideas I myself actually had to learn to
                understand dynamic load balancing.
              </div>
              <h1 className="text-lg underline text-secondary">
                Electricity and Circuits
              </h1>
              <div>
                Firstly, some entry-level details about electricity and circuits
                I had to teach myself (and hopefully, I can teach you) to grasp
                the problem are necessary. What I will explain here are the
                short and simple concepts - hopefully I've made the level of
                detail accessible for those unfamiliar, as I had to do so for
                myself.
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
                is the unit which describes the rate at which electrical charge
                (or electrons) flow through a circuit. We can think of this as
                the volume of water flowing though some pipework. Meanwhile,{' '}
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
                voltage. In the context of the Hydraulic Analogy, I like to
                think of it as the volume of water multiplied by the rate of
                flow, therefore being useful as a measure of the amount of water
                being delivered through the pipework over time. Bringing it back
                to electricity, wattage generally is used to describe the rate
                at which something is receiving electricity, particularly in the
                context of charging a car.
              </div>
              <div>
                There are two more key terms to introduce regarding circuits
                which are series and parellel. A circuit connected in series can
                be thought of as pipework consisting of a single pipe, while
                circuits running in parallel can be thought of as a pipe which
                splits off into different branches at some point.
              </div>
              <Image
                src="/assets/dlb/series-parallel.png"
                alt=""
                width={500}
                height={200}
                className="mx-auto border-2 border-black rounded"
              />
              <div>
                With this, there are also two forms that power can be delivered
                in, AC or DC. AC power is equivalent to water quickly
                oscillating back and forth in a pipe, while DC is equivalent to
                water being constantly pushed through a pipe (more intuitively).
                When I first heard this I thought, how are devices powered by AC
                power not constantly switching on and off then? Well AC power is
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
                problem with this is that half the time, the current is
                travelling away from the direction you want it to go, which is
                inefficient. All industrial electrical grids (that deliver power
                to your home) account for this by using standard 3 phase power,
                where instead of one alternating current, it cleverly delivers 3
                alternating currents simultaneously, but they are evenly spaced
                across time to deliver 3 times the power. See below:
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
                device draws power from all 3 phases and overall needs 100
                watts, does it draw 100 watts from each or 33.3 watts from each?
                As it happens, a{' '}
                <SiteLink href="https://www.quora.com/A-3-phase-machine-takes-a-100-ampere-current-Each-phase-takes-how-much-ampere">
                  3 phase device looking to draw 100 watts will draw a maximum
                  of 100 watts from each L1, L2 and L3
                </SiteLink>
                . This is because of how the phases are evenly spaced out to
                have the least overlap possible (as seen in the graph above),
                never delivering more than 100 watts to the device if 100 watts
                is delivered at the peak of each phase.
              </div>
              <h1 className="text-lg underline text-secondary">
                Electric Vehicle Chargers
              </h1>
              <div>
                As for electric vehicle chargers themselves, all you really need
                to know is that they are an outlet, often with many ports to
                charge from (exactly like an plug in your wall really). Some
                chargers use AC power, some use DC power. Since electrical power
                supplied from the grid is delivered in AC (as mentioned), DC
                power chargers will convert the AC power they receive into DC
                power inside them. I don't claim to know how - fortunately that
                won't be relevant. AC chargers can make use of a single phase or
                all 3 phases.
              </div>
              <div>
                For those wondering, we can actually set the amperage drawn by
                each connector from the grid. We do this using{' '}
                <SiteLink href="https://www.openchargealliance.org/protocols/ocpp-16/">
                  OCPP
                </SiteLink>
                , the standard which many EV smart charger communications abide
                by. However, a disclaimer that whatever amperage we set with
                OCPP will result the charger in drawing that amount from{' '}
                <span className="underline">all</span> connected phases.
              </div>
              <div>
                For those unfamiliar with all these concepts, it can be a lot to
                take in, particularly coming from someone who didn't properly
                know any of this before confronting the problem. It might be
                worth a reread or checking out the associated links if anything
                is still unclear, but any further nitpicking details regarding
                electricity shouldn't be necessary to know, just the general
                overview provided.
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
                important for just about everything you can think of. As a
                result, power companies will often only allocate some specified
                amount of amperage to each property. Since electric vehicle
                chargers draw extensive amounts of power, most properties with
                multiple chargers installed are likely to draw more amperage
                from the grid than their local power company has allocated them.
                As a result, electric vehicle chargers frequently cause power
                outages (when the load drawn by the property exceeds what it is
                allocated, tripping the local{' '}
                <SiteLink href="https://en.wikipedia.org/wiki/Circuit_breaker">
                  circuit breaker
                </SiteLink>{' '}
                - which I'm sure we've all experienced before) which can be
                obviously problematic for a variety of reasons.
              </div>
              <div>
                This is particularly relevant for properties which intend on
                having chargers installed, but don't have their electrical
                infrastructure primed to be a charging station, which is the
                case for many places currently looking at installing multiple
                chargers - city councils, apartments, parking lots etc. Dynamic
                Load Balancing (DLB), also known as Dynamic Load Management
                (DLM), is the localised solution to this problem. It connects a
                group of chargers to a software which ensures they won't exceed
                the allocated <span className="underline">amperage</span> of the
                property, as to be safe. The "dynamic" part of DLB refers to
                whenever a charger starts or stops being used, or the allocated
                amperage changes, the software will recalculate what amount of
                amperage each charger is allocated, or rather, can safely draw
                from the home circuit. Fortunately this part is easy, as that
                just ultimately involves sending the updates to a computer, and
                the computer sending them back to the chargers. The "load
                management" part refers to how we actually calculate this, and
                is more involved - figuring out how this should work will be the
                main focus of this article.
              </div>
              <div>
                One thing I should mention is that this article will focus on
                finding a load management algorithm which distributes power in a
                manner which is <span>safe</span> and{' '}
                <span>uses as much amperage as possible</span>. In the next
                article, this will be taken a step further and we will aim to
                find an algorithm which, on top of those two things, ensures the
                load management system finds the{' '}
                <span className="underline">
                  most evenly distributed amount of wattage
                </span>{' '}
                possible, as to guarantee each charger provides the most closely
                equal amount of power possible to those charging - granting
                fairness. But for now forget about that, we just want something
                that is safe and makes the most of the limited amperage the
                power company has given us.
              </div>
              <div>
                A lot of people (including myself at first glance, being
                formerly unfamiliar with the workings of circuits) initially
                assume the solution could be as straight forward as taking the
                amperage of the circuit breaker, dividing it by the number of
                active chargers, setting each charger to draw that amount, and
                moving on. Basic division, even yielding an evenly distributed
                allocation. However{' '}
                <span className="underline">3 major limitations</span> are faced
                that convolute the problem significantly. Believe it or not,
                considering these limitations makes the solution much more
                complicated than mere division.
              </div>
              <h1 className="text-lg underline text-secondary">Problem 1</h1>
              <div>
                The first limitation is the mixing of three phase and single
                phase devices (assuming a location uses 3 phase power). When
                allocating amperage to devices, we have to consider whether the
                allocation exceeds capacity of{' '}
                <span className="underline">any</span> of the 3 phases, rather
                than a single source. This is only a problem when putting single
                phase chargers on 3 phase property circuits, because if you look
                at the{' '}
                <Link
                  href="/articles/EVChargerDLB#3phasesection"
                  className="text-secondary hover:underline"
                >
                  3 phase graph again
                </Link>
                , one of these peaks will be imbalanced with the others when we
                have an additional device connected to it. If we have just 3
                phase devices or just single phase devices, this wouldn't be an
                issue because we wouldnt have to consider each phase seperately
                - we could effectively ignore two of them.
              </div>

              <h1 className="text-lg underline text-secondary">Problem 2</h1>
              <div>
                Another limitation emerges when considering the circuits of the
                devices and ports themselves. Often, each charger will have a
                couple of ports, which get allocated some share of the amperage
                given to the charger. The ports themselves have a maximum
                amperage they can safely use to charge a car, and on top of
                that, the devices themselves usually have a maximum circuit
                amperage which too must not be exceeded. We see now that on top
                of respecting the phase capacities, as we need to respect also
                the devices' circuit capacities.
              </div>
              <h1 className="text-lg underline text-secondary">Problem 3</h1>
              <div>
                The final limitation to consider is that we are trying to get
                balanced distribution of wattage, not amperage, such that
                everyone charging has the most similar charge rate achievable,
                thus being fair. Remember wattage is amperage times voltage. The
                good thing is that in local property circuits, almost always
                devices are connected in parallel. Now if we think about this in
                terms of our water analogy, this was like splitting the pipework
                in many directions. In such a case, the volume (amperage) will
                split, but the pressure (voltage) would stay the same, therefore{' '}
                <SiteLink href="https://www.allaboutcircuits.com/textbook/direct-current/chpt-5/simple-parallel-circuits/">
                  we may assume that the devices have the same voltage (V)
                </SiteLink>{' '}
                since they are connected in parallel. Hence at the device level,
                all we really need to think about is how we distribute amperage
                - since all we would need to do afterwards is multiply them all
                by the same number.
              </div>
              <div>
                However, within the devices themselves things get more
                complicated. Electric vehicle chargers can be AC or DC, and DC
                devices will convert the AC power they are given. In this
                process, DC fast chargers (or superchargers, as you might have
                heard of them) often apply a very large voltage in order to
                provide more power to the car. So we need to account for the
                voltage they apply in terms of balancing the wattage of active
                connectors.
              </div>

              <div>
                So.. we have a lot to think about. Whenever I get faced with a
                problem like this, the first thing I like to think is what
                information do we need? To even consider solving these load
                management problems we will always definitely need: the maximum
                amperage to allocate to all the chargers (for example, the limit
                set circuit breaker), the voltage of the local/home circuit and
                the devices at the location - including what phases they are
                attached to, what their maximum amperage is as well as their
                connectors and connector maximum amperages. If the device is DC,
                we also need to know what voltage it applies.
              </div>
            </div>
            <h1 className="text-2xl underline text-secondary">
              Breaking Down The Problem
            </h1>
            <div className="flex flex-col gap-y-4">
              <div>
                Personally, I think even with it listed out there's still far
                too much to think about at the moment in terms of approaching
                this, we need to break it down into something more digestible.
                Firstly, we should list out our set of aims, and also a set of
                restrictions/assumptions for this problem, so the outline of
                what we're trying to do can all be in one place.
              </div>
              <h1 className="text-lg underline text-secondary">Assumptions</h1>
              <div>
                We aim to:
                <ul className=" ml-6">
                  <li>
                    a) Allocate each active charging port an amount of amperage
                    in proportion to what they all require
                  </li>
                  <li>
                    b) Allocate each active charging port a maximal amount of
                    power
                  </li>
                  <li>c) Respect all amperage capacities</li>
                </ul>
              </div>
              <div>
                Then the restrictions/assumptions we have are:
                <ul className="ml-6">
                  <li>i) Devices are connected in parallel</li>
                  <li>ii) Each device has a maximal circuit amperage</li>
                  <li>
                    iii) Each port of a device also has a seperate maximal
                    amperage
                  </li>
                  <li>
                    iv) Each AC phase from the grid supplies an equal amperage
                    to the location
                  </li>
                  <li>
                    v) There can be any number of devices. A device can have any
                    number of ports
                  </li>
                  <li>
                    vi) Every port can readily have it's maximum amperage set
                  </li>
                  <li>
                    vii) Every property is delivered a charge of 240 volts,
                    which is standard in most buildings. If this is not the
                    case, you can very easily make a substitution.
                  </li>
                </ul>
              </div>
              <div>
                Certainly, this is still a lot to consider, and could not easily
                be figured out by simply sitting and thinking about it long
                enough. Thinking about each phase, device, connector and
                constraint at the same time is most likely too straining on
                short-term memory for most to make any real progress trying to
                solve. With this, my immediate idea is that we must find a way
                to represent a given DLB setup, for the sake of getting a better
                intuition and interpretation of the problem. The obvious initial
                choice is to represent this as a tree, since it does appear we
                have these 'layers' of dependency (the allocation of a port
                depends on the allocation of a device, devices depend on phases,
                vise versa).
              </div>
              <h1 className="text-lg underline text-secondary">
                Example: Location A
              </h1>
              <div>
                As an example, consider a Location A which has 60 amps supplied
                by the grid and 3 chargers which are:
                <ul className="list-disc ml-6">
                  <li>
                    A 3 phase device with max amperage 32A. One active port with
                    max amperage 20A, another active port with max amperage 32A
                  </li>
                  <li>
                    A single phase device (connected to L2) with max amperage
                    12A. One sole active port with max amperage 10A
                  </li>
                  <li>
                    A single phase device (connected to L3) with max amperage
                    22A, an inactive port with max amperage 15A, an active port
                    with max amperage 12A.
                  </li>
                </ul>
              </div>
              <div>
                I should acknowledge that it is, in practice, unlikely a charger
                will have ports with different max amperages (in fact, they
                usually have the same max as the device). But we need to extend
                our model to all cases to ensure it will generalise well in the
                caprice of the real world. Nonetheless, describing Location A in
                the way we just have is in itself an example of why we need to
                represent this somehow else, writing it out is clearly verbose.
                We can instead model that example easily by representing it with
                the following diagram:
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
                <span className="underline">does not</span> intend to or
                adequately represent the circuitry of the system, but rather the
                dependencies and restrictions on amperage in allocating a safe
                amount - essentially all the pieces relevant to the DLM problem.
                With this method of representing a location, therefore granting
                a data structure (the tree) for a location, we can finally move
                on to solving the problem.
              </div>
            </div>
            <h1 className="text-2xl underline text-secondary">
              Solving The Model
            </h1>
            <div className="flex flex-col gap-y-4">
              <div>
                We now need to use this tree structure to figure out what the
                optimal allocation is, or rather, an algorithm that does so.
              </div>
              <div>
                As a starting point, the algorithm we derive should obviously
                involve allocating 0 amps to innactive chargers, but then
                allocating the most evenly distributed and maximal amount of
                power to every other charger. The other is an optimised approach
                which I find rather beautiful, and frankly, is the reason I
                decided to write this article.
              </div>
              <div>
                A quick disclaimer that both the solutions I will provide will
                grant the most even distribution of{' '}
                <span className="underline">amperage</span>, then at the end I
                will reveal a subtle trick we can tack on to make it even out on
                the basis of power.
              </div>
              <h1 className="text-lg underline text-secondary">
                The Quick and Dirty Fix
              </h1>
              <div>
                Surprisingly, there is a fairly primitive solution that works
                exceptionally well{' '}
                <span className="underline">exclusively</span> for locations
                where devices have large circuit capacities in proportion to the
                grid allocation. It simply is as follows:
              </div>
              <div>
                <ol className="list-decimal ml-5">
                  <li>
                    Find the phase with the most active connectors attached to
                    it - count how many there are
                  </li>
                  <li>
                    Divide the grid amperage by that number of active connectors
                  </li>
                  <li>
                    Set each active connector to the minimum of {'{'} that
                    division result, it's port capacity, it's device capacity{' '}
                    {'}'}.
                  </li>
                </ol>
              </div>
              <EditThis>Include animation gif of algo on Location A</EditThis>
              <EditThis>
                <div>
                  This works because if we target the phase with the most active
                  connectors (and each phase provides the same amperage),
                  dividing the supplied amperage by the number of active
                  connectors will certainly set out to allocate a safe amperage
                  to each connector.
                </div>
                <div>
                  But because that phase has the most active connections, it
                  certainly won't exceed the others too. So immediately, this
                  algorithm respects the grid capacity. Since we minimum of that
                  and the capacities of the branch a connector is on, we respect
                  the capacities of everything.
                </div>
              </EditThis>
              <div>
                However, the problem with this approach arises in the following
                case. For example, consider the following location:
              </div>
              <EditThis>Include location diagram</EditThis>
              <div>
                From the initial step where we divide the phase supply, we will
                try to allocate 30A to the three active connectors. But two of
                those connectors can only be set to 22A, the other to 40A, we
                have this leftover unusued 16A to give to the other active
                connector. Ideally we would set them to draw 16A, 16A and 40A,
                and this wouldn't exceed any capacities. However, going through
                our algorithm, what we would end up setting it to is 16A, 16A
                and 30A - not ideal as we are not delivering as much as we can
                to that 40A connector. So we have to do some sort of 'extra
                pass' to donate this.
              </div>
              <div>
                But what if in this extra pass, we again allocate past some
                capacity and have leftover? Remember we assumed that the
                location could have any amount of devices and connectors. A
                location could very easily be constructed such that this
                algorithm ends up in this loop where we don't necessarily know
                at what step it would terminate. For example, the following
                abstract location would cause our algorithm to run for an
                arbitrarily long amount of time, at least in theory. If you've
                got the time, try applying the steps described to the following
                location to better see what the problem is.
              </div>
              <EditThis>Include abstract infinite runtime location</EditThis>
              <div>
                The reason we shouldn't use this algorithm is because it poses a
                security risk, as someone could easily submit this edge-case
                location to be processed and get our server stuck in an infinite
                loop. We could potentially include a verification step to ensure
                that they haven't submitted this kind of location, but at that
                point it's starting to look like this solution just isn't very
                elegant - particularly in contrast to what comes next. Ideally
                we want to gaurantee that the balanced load can be calculated in
                a deterministic amount of time - especially in the professional
                setting of software.
              </div>
              <h1 className="text-lg underline text-secondary">
                The Trickling Algorithm
              </h1>
              <div>
                While this algorithm can be explained quite easily to
                programmers or computer scientists, like much of this article I
                want to explain it in a way that demonstrates the discrete
                thinking involved in coming up with such a method, as to be
                accessible to all. One of my main goals of this website is to
                illustrate that complex solutions to problems can be arrived at
                by anybody - just by thinking about the problem in a simpler way
                with more digestible steps, rather than trying to solve it by
                sitting and waiting for some absurd stroke of brilliance.
              </div>
              <div>
                For the sake of those uninterested in the thought required to
                derive this algorithm, I'll first explain the steps, then
                explain afterwards how such a conclusion can be arrived at.
              </div>
              <ol className="list-decimal ml-5">
                <li>
                  For each device, make a list of what amperage each of it's
                  connectors will maximally draw (set to 0 if the connector is
                  not being used)
                </li>
                <li>
                  Calculate the sum of that list. For each number in that list,
                  multiply it by (the devices max amperage / the sum of the
                  list)
                </li>
                <li>
                  For each phase, make a list of each connected device's list
                  sum
                </li>
                <li>
                  Again, calculate the sum of that list. For each number in that
                  list, multiply it by (the grid amperage / the sum of the list)
                </li>
                <li>For each phase, and each device it has </li>
              </ol>
              <div>
                When I first started to understand truly what was involved in
                this problem, one of first things on my mind was where a
                "perfectly even" distribution would occur in nature, to get an
                intuition for such a thing. I think when understanding any
                algorithm, proof, or anything rigorous, it is imperative to
                first gain an intuition for what you are trying to do or prove
                before you actually turn it into something concrete - kind of
                like understanding circuits via the Hydraulic Analogy. My
                immediate idea was that water has this behaviour of being
                "perfectly even" in distribution (or at least, is close enough
                to convey the illusion of such) when trickling from the top of a
                perfectly round object. Perhaps you've seen
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
                We have the intuition of a solution, we just have to formalise
                it now, so that it is programmable. Our program will need to
                know In nature a tree will propagate water from it's roots, and
                have water pour down evenly from it's canopy. The reason I call
                this tree tipping is because in the first pass, we will traverse
                from the connectors to the phases to determine allocations,
                things are naturally flowing towards the top - the propagation
                step. After that all we have to do is let the water (amperage)
                be 'tipped' into the top and flow eventually into the
                connectors, determining their safely optimal allocation.
              </div>
              <div>
                What this step requires is that for each device, we create a
                vector of what amperage each connector is asking for. We then
                normalise it to have a sum equal to the device's max amperage.
                This way we find an allocation which does not exceed the
                capacity of the parent node, and is in perfect proportion to
                what amperage each connector is asking for.
              </div>
              <div>ANIMATION</div>
              <div>
                Now what's perfect about this is that connectors bear the same
                relationship to devices as devices do to the phase nodes, so we
                can just repeat that step recursively, for the whole tree. That
                is, after creating our device vector, we propagate to each phase
                the amperage each device is asking for, and normalise the sum to
                be equal to the grid amperage. See the whole propagation step
                visually below.
              </div>
              <div>IMAGE</div>
              <div>
                After this we simply let the tree do it's work, 'tipping' the
                amperage from the phases through the tree, having the water flow
                from the canopy (to continue our analogy) through to the bottom
                layer. Since each phase was passed a 0
              </div>
            </div>
          </div>
        </EditThis>
      </PostSummary>
    </div>
  )
}

export const FairEVChargerDLBSummary = () => {
  return (
    <PostSummary
      title="Fairly Distributed Load Balancing for EV Charging Stations"
      isPageHeader={false}
      children={undefined}
      link="articles/EVChargerDLB"
      desc="A generalisable model to safely distribute amperage across a set of electric vehicle chargers, without exceeding circuit capacities."
    />
  )
}

export default FairEVChargerDLB
