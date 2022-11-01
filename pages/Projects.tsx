import { NextPage } from 'next'
import DropdownPost from './DropdownPost'
import { SitePage } from './SiteHeader'

export const ProjectMenu: NextPage = () => {
  return (
      <SitePage>
        <div className="gap-y-6 flex flex-col px-24 py-12 mb-8">
          <DropdownPost name="Twitter Follower Data Analysis" />
          <DropdownPost name="This Website" />
          <DropdownPost name="Dynamic Load Balancing for EV chargers" />
          <DropdownPost name="2048 Bot" />
          <DropdownPost name="EVUp Charge" />
          <DropdownPost name="A Basic Checkers Bot in C" />
        </div>
      </SitePage>
  )
}

export default ProjectMenu
