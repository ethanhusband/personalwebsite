import SitePage from './components/SitePage'
import PostSummary from './components/PostSummary'

const About = () => {
  return (
    <SitePage>
      <div className="w-full mt-16 h-auto rounded-lg">
        <PostSummary imgUrl="" link="/About" title="About" isPageHeader={true}>
          <div>
            This site comprises my cabinet of projects and ideas in my time as a
            Softare Developer and Mathematics Student.
          </div>
        </PostSummary>
      </div>
    </SitePage>
  )
}

export default About
