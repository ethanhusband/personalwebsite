import { NextPage } from 'next'
import { EVChargerDLBSummary } from './articles/EVChargerDLB'
import PostSummary from './components/PostSummary'
import { SitePage } from './components/SitePage'

export const BlogMenu: NextPage = () => {
  return (
    <div className="px-24 py-12">
      <ul>
        <li>
          <PostSummary
            title="How Group Theory Can Speed Up Hashing Algorithms"
            link=""
            desc=""
            children={undefined}
            isPageHeader={false}
          />
          <EVChargerDLBSummary />
        </li>
        {/** 
              <li>How Quantum Computers Mark Solutions</li>
              <li>Classing Holomorphic Complex Functions</li>
              <li>How Is e Irrational?</li>
              <li>The Fairness of Allocating To a Prime Number of People</li>
              
               * How To Make a Developer Blog (Like This)
               * How To Setup Prisma and PlanetScale SQL databases
               * How To Setup an independent GraphQL server
               * How To Get Auth For Your App
               * Automating Business Decisions with Game Theory and Microeconomics
               * Understanding the Riemann Zeta conjecture (prime number proof, all zeros in [0,1])
               */}
      </ul>
    </div>
  )
}

export default BlogMenu
