import { NextPage } from 'next'
import DropdownPost from './DropdownPost'
import { SitePage } from './SiteHeader'

export const BlogMenu: NextPage = () => {
  return (
    <SitePage>
      <div className="px-24 py-12">
        <ul>
          <li>
            <DropdownPost name="How Group Theory Can Speed Up Hashing Algorithms"></DropdownPost>
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
    </SitePage>
  )
}

export default BlogMenu
