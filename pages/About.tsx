import Link from 'next/link'
import PostSummary from './components/PostSummary'

const About = () => {
  // For some reason, passing that outer div (with flex col) abstractly to all props doesn't apply the style correctly
  // Hence it is done manually for each one. A frustrating nextjs flaw.
  return (
    <div className="gap-y-6 flex flex-col">
      <PostSummary
        link="/About"
        title="About"
        desc="Ethan Husband"
        isPageHeader={true}
      >
        <div className="flex flex-col gap-y-4">
          <div>
            This site comprises my cabinet of projects and ideas mostly
            pertaining to Software Engineering, Computer Science and
            Mathematics.
          </div>
          <div>
            I am currently working as the lead developer at{' '}
            <Link href="/projects/EVUpCharge" className="text-secondary">
              EVUp Charge
            </Link>
            , a startup targetted at facilitating a variety of services for
            electric vehicle smart chargers in Australia. I am also studying a
            Bachelor of Science (Pure Mathematics) and a concurrent diploma of
            Computer Science full time at the University of Melbourne, with the
            intention of doing a Masters degree at ETH Zurich.
          </div>
          <div>Contact: eth.husband@gmail.com</div>
        </div>
      </PostSummary>
    </div>
  )
}

export default About
