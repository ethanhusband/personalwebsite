/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import PostSummary from '../components/PostSummary'
import { SiteLink } from '../components/SiteLink'

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
            This site is an effort to share, at a level of detail I intend to
            make accessible to all, some of the fascinating problems and ideas
            I've encountered, generally pertaining (but not limited) to Software
            Engineering and Abstract Math.
          </div>
          <div>
            I sincerely hope to show through this website that clever solutions
            to real problems can be achieved by anyone, by breaking down the
            thinking steps involved and providing thorough explanations - to
            convey the more abstract notion I subscribe to that we are all are
            far less cognitively limited than we often might concede.
          </div>
          <div>
            The <SiteLink href="/Blog">Blog section</SiteLink> includes articles
            regarding problems I've dedicated thought or novel solutions to, and
            will always have full explanations. It also features projects I've
            developed myself or contributed to - with rough explanations of how
            they all work.
          </div>

          <div>
            I currently work full time as an Associate Software Engineer at{' '}
            <Link href="https://www.vivi.io/" className="link-styling">
              Vivi International
            </Link>
            , an Australian company delivering EdTech software to over 100,000
            classrooms across the globe. I recently graduated from a B.Sc. Pure
            Mathematics at the University of Melbourne
          </div>
          <div className="text-secondary">Contact: eth.husband@gmail.com</div>
        </div>
      </PostSummary>
    </div>
  )
}

export default About
