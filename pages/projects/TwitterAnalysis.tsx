import PostSummary from '../components/PostSummary'
import Link from 'next/link'
import Image from 'next/image'

export const TwitterAnalysis = (context: any) => {
  return (
    <div className="flex flex-col ">
      <PostSummary
        title="Twitter Popularity Analysis"
        link="/TwitterAnalysis"
        desc="Assignment - 17/10/2022"
      >
        <div className="flex flex-col gap-y-4">
          <div>
            This is a group project I led involving a Python based data analysis
            report, using Pandas and Scikit-Learn. The report analyses the
            popularity (number of followers) of a user in contrast to features
            such as user interactivity, coherence and other language features on
            a derived dataset of roughly 5000 twitter users. Techniques employed
            include Pearson Correlation, Mutual Information and Regression
            Analysis.
          </div>
          <div>
            An abstract data processing pipeline was built in such a way that
            enables anyone to choose which section of a dataset to process via
            the described techniques. While it was not done so (as this project
            is in the context of an assignment), this pipeline can be readily
            modified to be used on any csv file where one wishes to analyse a
            given column against other data in the set using Pearson
            Correlation, Mutual Information and Regression Analysis. The
            pipeline makes use of the Pandas and Scikit Learn python libraries
            to do the appropriate data manipulations and analyses.
          </div>
          <div>
            Code aside, the report includes some interesting findings, the most
            noteworthy being that years on the app has by far the strongest
            correlation to followers. Also, surprisingly, fields such as total
            tweets and hashtags per tweet were negatively correlated to
            followers (although admittedly, a weak correlation, but nonetheless
            shocking) with followers. Another, quite comical, outcome was that
            all measures of 'coherence' (lexicographical coherence, topic
            coherence) exclusively bore a negative correlation with a user's
            number of followers. Samples of just the correlation matrices are
            below.
          </div>
          <div className="flex flex-row mx-auto gap-x-4">
            <Image
              src="/assets/twitter-analysis/correlationBasic.png"
              width={200}
              height={200}
              alt="Basic Features Correlation Matrix"
              className="border-2 border-black"
            />
            <Image
              src="/assets/twitter-analysis/correlationCohere.png"
              width={300}
              height={200}
              alt="Coherence Correlation Matrix"
              className="border-2 border-black"
            />
          </div>
          <div>
            The report, as well as the abstract pipeline which generates the
            data used in the report, can be found here:{' '}
            <Link
              className="text-secondary"
              target="_blank"
              href="https://github.com/ethanhusband/follower-analysis.git"
            >
              https://github.com/ethanhusband/follower-analysis.git
            </Link>
          </div>
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
