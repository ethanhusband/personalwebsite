import { NextPage } from 'next'
import { EVChargerDLBSummary } from './articles/EVChargerDLB'

export const BlogMenu: NextPage = () => {
  return (
    <div className="gap-y-6 flex flex-col">
      <EVChargerDLBSummary />
      {/** 
              <li>How Quantum Computers Mark Solutions</li>
              <li>Classing Holomorphic Complex Functions</li>
              <li>How Is e Irrational?</li>
              <li>The Fairness of Allocating To a Prime Number of People</li>
              
               * How To Setup Prisma and PlanetScale SQL databases
               * How To Setup an independent GraphQL server
               * Understanding the Riemann Zeta conjecture (prime number proof, all zeros in [0,1] proof)
               * The Beauty of Complex Numbers
               * Optical Transistors
               * Application Course (gql, react, terraform)
               */}
    </div>
  )
}

export default BlogMenu
