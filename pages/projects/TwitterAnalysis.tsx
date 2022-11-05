import PostSummary from '../components/PostSummary'
import SitePage from '../components/SitePage'

export const TwitterAnalysis = (context: any) => {
  return (
    <TwitterSummary>
      <div></div>
    </TwitterSummary>
  )
}

export const TwitterSummary = ({ children }: any) => {
  return (
    <PostSummary
      title="Twitter Popularity Analysis"
      imgUrl="/assets/twitter-analysis/residual_plot.png"
      isPageHeader={false}
      link="/TwitterAnalysis"
      desc="A basic Python data analysis report using Pandas and Scikit-Learn. Analysing the popularity (number of followers) of a user in contrast to features such as user interactivity, coherence and other language features. Techniques include Pearson Correlation, Mutual Information and Regression Analysis."
    >
      {children}
    </PostSummary>
  )
}

export default TwitterAnalysis
