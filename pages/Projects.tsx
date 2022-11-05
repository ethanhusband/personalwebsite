import { NextPage } from 'next'
import PostSummary from './components/PostSummary'
import { SitePage } from './components/SitePage'
import { TwitterSummary } from './projects/TwitterAnalysis'

export const ProjectMenu: NextPage = () => {
  return (
    <div className="gap-y-6 flex flex-col px-24 py-12 mb-8">
      <TwitterSummary />
      <PostSummary
        title="This Website"
        imgUrl=""
        desc=""
        isPageHeader={false}
        link=""
        children={undefined}
      />

      <PostSummary
        title="2048 Bot"
        isPageHeader={false}
        imgUrl=""
        link=""
        desc=""
        children={undefined}
      />
      <PostSummary
        title="EVUp Charge"
        isPageHeader={false}
        imgUrl=""
        link=""
        desc=""
        children={undefined}
      />
      <PostSummary
        title="A Basic Checkers Bot in C"
        isPageHeader={false}
        imgUrl=""
        link=""
        desc=""
        children={undefined}
      />
    </div>
  )
}

export default ProjectMenu
