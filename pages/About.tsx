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
            This site comprises my cabinet of projects and ideas in my time as a
            Softare Developer and Mathematics Student.
          </div>
          <div>
            I am currently employed as the lead developer at EVUp Charge, a
            startup targetted at facilitating services for OCPP electric vehicle
            smart chargers. I am also studying a Bachelor of Science (Pure
            Mathematics) and a concurrent diploma of Computer Science full time
            at the University of Melbourne, with the intention of doing a
            Masters degree at ETH Zurich (hopefully).
          </div>
          <div>Contact: eth.husband@gmail.com</div>
        </div>
      </PostSummary>
    </div>
  )
}

export default About
