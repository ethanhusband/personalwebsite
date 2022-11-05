import { NextPage } from 'next'
import { CheckersBotSummary } from './projects/CheckersBot'
import { EVUpChargeSummary } from './projects/EVUpCharge'
import { Py2048BotSummary } from './projects/Py2048Bot'
import { ReactMandelbrotSummary } from './projects/ReactMandelbrot'
import { ThisWebsiteSummary } from './projects/ThisWebsite'
import { TwitterSummary } from './projects/TwitterAnalysis'

export const ProjectMenu: NextPage = () => {
  return (
    <div className="gap-y-6 flex flex-col px-24 py-12 mb-8">
      <ReactMandelbrotSummary />
      <TwitterSummary />
      <ThisWebsiteSummary />
      <Py2048BotSummary />
      <EVUpChargeSummary />
      <CheckersBotSummary />
    </div>
  )
}

export default ProjectMenu
