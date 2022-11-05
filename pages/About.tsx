import SitePage from './components/SitePage'
import PostSummary from './components/PostSummary'

const About = () => {
  return (
    <div className="w-full mt-16 h-auto rounded-lg">
      <PostSummary
        imgUrl=""
        link="/About"
        title="About"
        desc="Ethan Husband"
        isPageHeader={true}
      >
        <div>
          <div>
            This site comprises my cabinet of projects and ideas in my time as a
            Softare Developer and Mathematics Student.
          </div>
          <div className="mt-4">Contact: eth.husband@gmail.com</div>
        </div>
      </PostSummary>
    </div>
  )
}

export default About
