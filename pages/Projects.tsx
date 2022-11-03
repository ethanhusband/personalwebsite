import { NextPage } from 'next'
import PostSummary from './components/PostSummary'
import { SitePage } from './components/SitePage'

export const ProjectMenu: NextPage = () => {
  return (
    <SitePage>
      <div className="gap-y-6 flex flex-col px-24 py-12 mb-8">
        <PostSummary
          title="Twitter Follower Data Analysis"
          imgUrl=""
          isPageHeader={false}
          link="/pages/TwitterAnalysis"
          children={undefined}
        />
        <PostSummary
          title="This Website"
          imgUrl=""
          isPageHeader={false}
          link=""
          children={undefined}
        />
        <PostSummary
          title="Dynamic Load Balancing for EV chargers"
          imgUrl=""
          isPageHeader={false}
          link=""
          children={undefined}
        />
        <PostSummary
          title="2048 Bot"
          isPageHeader={false}
          imgUrl=""
          link=""
          children={undefined}
        />
        <PostSummary
          title="EVUp Charge"
          isPageHeader={false}
          imgUrl=""
          link=""
          children={undefined}
        />
        <PostSummary
          title="A Basic Checkers Bot in C"
          isPageHeader={false}
          imgUrl=""
          link=""
          children={undefined}
        />
      </div>
    </SitePage>
  )
}

export default ProjectMenu
