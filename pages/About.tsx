import Link from 'next/link'
import PostSummary from '../components/PostSummary'

const About = () => {
  // For some reason, passing that outer div (with flex col) abstractly to all props doesn't apply the style correctly
  // Hence it is done manually for each one. A frustrating flaw.
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
            This site is an effort to share the some of the fascinating problems
            and ideas I've encountered, generally pertaining (but not limited)
            to Software Engineering or Abstract Math. The Blog section includes
            articles regarding theoretical problems I've dedicated thought or
            novel solutions to, and wish to share at a level of detail I intend
            to make accessible to all. Meanwhile, the Projects section includes
            overviews of projects I've engaged in creating or developing - with
            rough explanations of how they all work.
          </div>
          <div>
            I sincerely hope to show through this website that clever solutions
            to real problems can be achieved by anyone, by breaking down the
            thinking steps involved and providing thorough explanations - to
            convey the more abstract notion I subscribe to that we are all are
            far less cognitively limited than we often might concede.
          </div>
          <div>
            I am currently employed as the lead developer at{' '}
            <Link href="/projects/EVUpCharge" className="link-styling">
              EVUp Charge
            </Link>
            , an Australian company targetted at facilitating a variety of
            services for electric vehicle smart chargers across the country. I
            am also studying a Bachelor of Science (Pure Mathematics) and a
            concurrent diploma of Computer Science full time at the University
            of Melbourne, with the intention of doing a Masters degree at ETH
            Zurich.
          </div>
          <div className="text-secondary">Contact: eth.husband@gmail.com</div>
        </div>
      </PostSummary>
    </div>
  )
}

export default About
