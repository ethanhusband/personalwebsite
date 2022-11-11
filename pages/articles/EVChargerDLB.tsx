import PostSummary from '../components/PostSummary'
import Link from 'next/link'

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
            The Charging Problem
          </h1>
          <div>
            In the rapidly growing electric vehicle industry, the importance of
            accessible and reliable charging infrastructure is vital to a
            complete transition from combustion vehicles. Charging, whether it
            be infrastructure, batteries, the capacities of chargers, is often
            cited as the biggest problem holding back electric vehicles from
            reaching the{' '}
            <a
              className="text-secondary"
              href="https://www.energymonitor.ai/sectors/automotive/electric-vehicle-tipping-point"
            >
              'tipping point'
            </a>{' '}
            in regards to mass adoption. A great resource that adequately
            describes the current problem surrounding electric vehicle charging
            infrastructure can be found{' '}
            <a
              className="text-secondary"
              href="youtube.com/watch?v=pLcqJ2DclEg"
            >
              here
            </a>
            .
          </div>
          <div>
            My current place of work, EVUp, aims at providing solutions to these
            problems, in particular{' '}
            <Link
              className="text-secondary"
              href="https://charge.evup.com.au/ecommerce/"
            >
              EVUp Charge
            </Link>
            , which is a software I've primarily contributed to since Feb 2022
            that provides deep functionality for OCPP smart chargers while
            connecting drivers to their nearest charger. The functionality
            includes monetisation of these chargers for venues (or anyone who
            owns a charger, essentially) and providing information about usage
            and other monitoring features. It also offers dynamic load
            management for charging stations (see{' '}
            <Link
              className="text-secondary"
              href="https://www.evup.com.au/ev-charging-station-load-management"
            >
              BalanceUp
            </Link>
            ), which is what brought me to this problem.
          </div>
          <h1 className="text-2xl underline text-secondary">
            Load Management/Balancing
          </h1>
          <div>
            One of the key problems faced in the process of expanding EV
            charging infrastructure, is the power load strained on the grid in
            doing so. Since electric vehicle chargers draw extensive amounts of
            power from the grid, most properties with multiple chargers
            installed are likely to draw more power from the grid than their
            local power company has allocated, resulting in power outages (when
            the load drawn by the property exceeds what it is allocated). This
            is particularly relevant for properties which intend on having
            chargers setup, but aren't primed to be a charging station (many of
            the clients of EVUp - apartments, parking lots, city councils).
            Dynamic Load Management (also known as Dynamic Load Balancing, DLB,
            DLM etc.) is the localised solution to this problem.
          </div>
          <div>
            However, this solution is not as straight forward as taking the grid
            allocation amperage, dividing it by the number of active chargers,
            and moving on. Many other limitations are faced that convolute the
            problem. One is the mixing of three phase and single phase devices
            at a single location. Most industrial electrical grids have standard
            3 phase power, where instead of one alternating current (AC), it
            uses 3 alternating currents which are shifted as to be evenly spaced
            and deliver 3 times the power. This means that when allocating
            amperage to devices, we have to consider whether the allocation
            exceeds capacity of any of the 3 phases, rather than a holistic grid
            (at least, when any single phase chargers are involved, otherwise it
            becomes the same). Another limitation emerges when considering
            devices and ports. Often, each charger will have a couple of ports,
            which have their own allocations. The ports themselves have a
            maximum capacity they can use to charge a car, and on top of that,
            the devices themselves usually have a circuit amperage which must
            not be exceeded.
          </div>
          <h1 className="text-2xl underline text-secondary">
            Modelling the problem
          </h1>
          <div>
            What DLB aims to do is allocate each active charging port an amount
            of amperage that is i) as equal as possible ii) as maximal as. The
            restrictions on the problem are i) each charger has a maximal
            circuit amperage ii) each port (of which the charger usually has a
            couple) also has a maximal circuit amperage and iii) the grid has a
            ceiling on how much amperage your property can use. At first, the
            solution seems simple. We can just create a big tree of all the
            connections from each port to the grid,
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
      desc="An software based solution to balance amperage distribution across a set of OCPP chargers, without exceeding a given grid capacity."
    />
  )
}

export default EVChargerDLB
