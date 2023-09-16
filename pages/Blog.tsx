import { NextPage } from 'next'
import { EVChargerDLBSummary } from './articles/EVChargerDLB'
import { EVUpChargeSummary } from './projects/UpCharge'
import { ThisWebsiteSummary } from './projects/This-Website'
import { ReactMandelbrotSummary } from './projects/React-Mandelbrot'
import { TwitterSummary } from './projects/Twitter-Analysis'
import { Py2048BotSummary } from './projects/2048Bot'
import { CheckersBotSummary } from './projects/CheckersBot'
import { useState } from 'react'
import { FaAngleRight, FaAngleLeft, FaAngleDown } from 'react-icons/fa'

export const BlogMenu: NextPage = () => {
  return <BlogPage />
}

export const BlogPage = () => {
  const [showProjects, updateShowProjects] = useState(true)

  return (
    <div className="gap-y-6 flex flex-col">
      <EVChargerDLBSummary />
      <div className="w-1/2 mx-auto flex flex-row justify-center">
        <hr className="w-full my-auto" />
        <button
          className="bg-primary rounded-lg py-2 px-4 border border-white flex flex-row items-center justify-evenly gap-2"
          onClick={() => updateShowProjects(!showProjects)}
        >
          {showProjects ? <FaAngleDown /> : <FaAngleRight />}
          <div>Projects</div>
          {showProjects ? <FaAngleDown /> : <FaAngleLeft />}
        </button>
        <hr className="w-full my-auto" />
      </div>
      {showProjects && (
        <>
          <ThisWebsiteSummary />

          <EVUpChargeSummary />

          <ReactMandelbrotSummary />
          <TwitterSummary />
          <Py2048BotSummary />
          <CheckersBotSummary />
        </>
      )}

      {/** 
       * Fair DLB     
       * Automated Stripe Disbursements
       * Classing Holomorphic Complex Functions
              
               * Fair DLB
               * Using AI to solve N-queens

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
