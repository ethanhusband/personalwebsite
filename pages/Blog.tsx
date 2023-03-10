import { NextPage } from 'next'
import { EVChargerDLBSummary } from './articles/EVChargerDLB'

export const BlogMenu: NextPage = () => {
  return (
    <div className="gap-y-6 flex flex-col">
      <EVChargerDLBSummary />
      {/** 
       * Fair DLB     
       * Automated Stripe Disbursements
       * Classing Holomorphic Complex Functions
              
               * How To Setup Prisma and PlanetScale SQL databases
               * How To Setup an independent GraphQL server
               * Understanding the Riemann Zeta conjecture (prime number proof, all zeros in [0,1] proof)
               * The Beauty of Complex Numbers
               * Application Course (gql, react, terraform)
               * Handshake design pattern
               */}
    </div>
  )
}

export default BlogMenu
