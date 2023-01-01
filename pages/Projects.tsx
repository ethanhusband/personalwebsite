import { NextPage } from 'next'
import { CheckersBotSummary } from './projects/CheckersBot'
import { EVUpChargeSummary } from './projects/UpCharge'
import { Py2048BotSummary } from './projects/2048Bot'
import { ReactMandelbrotSummary } from './projects/React-Mandelbrot'
import { ThisWebsiteSummary } from './projects/This-Website'
import { TwitterSummary } from './projects/Twitter-Analysis'

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
