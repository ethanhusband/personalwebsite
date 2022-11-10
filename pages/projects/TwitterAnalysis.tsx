import PostSummary from '../components/PostSummary'
import SitePage from '../components/SitePage'

export const TwitterAnalysis = (context: any) => {
  return (
    <div className="flex flex-col ">
      <PostSummary
        title="Twitter Popularity Analysis"
        isPageHeader={true}
        link="/TwitterAnalysis"
        desc="Assignment - DD/MM/YY"
      >
        <div>
          A basic Python data analysis report using Pandas and Scikit-Learn.
          Analysing the popularity (number of followers) of a user in contrast
          to features such as user interactivity, coherence and other language
          features. Techniques include Pearson Correlation, Mutual Information
          and Regression Analysis.
        </div>
      </PostSummary>
    </div>
  )
}

export const TwitterSummary = () => {
  return (
    <PostSummary
      title="Twitter Popularity Analysis"
      isPageHeader={false}
      children={undefined}
      link="projects/TwitterAnalysis"
      desc="Basic Python data analysis report on Twitter Users, using Pandas and Scikit-Learn"
    />
  )
}

export default TwitterAnalysis
