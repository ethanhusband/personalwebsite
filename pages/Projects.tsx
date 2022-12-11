import { NextPage } from 'next'
import { CheckersBotSummary } from './projects/CheckersBot'
import { EVUpChargeSummary } from './projects/EVUpCharge'
import { Py2048BotSummary } from './projects/Py2048Bot'
import { ReactMandelbrotSummary } from './projects/ReactMandelbrot'
import { ThisWebsiteSummary } from './projects/ThisWebsite'
import { TwitterSummary } from './projects/TwitterAnalysis'

export const ProjectMenu: NextPage = () => {
  return (
    <div className="flex flex-col gap-y-6">
      <EVUpChargeSummary />
      <ThisWebsiteSummary />
      <ReactMandelbrotSummary />
      <TwitterSummary />
      <Py2048BotSummary />
      <CheckersBotSummary />
    </div>
  )
}

export default ProjectMenu
