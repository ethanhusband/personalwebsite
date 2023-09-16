import PostSummary from '../../components/PostSummary'
import { SiteCodeBlock } from '../../components/SiteCodeBlock'
import { SiteLink } from '../../components/SiteLink'

export const ThisWebsite = () => {
  return (
    <div className="flex flex-col">
      <PostSummary
        title="This Website"
        link="/projects/This-Website"
        desc="Personal Project - 01/01/2023"
      >
        <div className="flex flex-col gap-y-4">
          <div>
            This website itself is a simple{' '}
            <SiteLink href="https://nextjs.org/">Next.js</SiteLink> site written
            in Typescript and deployed easily by Vercel. Requiring no backend
            and with frontend styling delivered largely through{' '}
            <SiteLink href="https://tailwindcss.com/">Tailwind</SiteLink>, it is{' '}
            <SiteLink href="https://github.com/ethanhusband/personalwebsite">
              open source
            </SiteLink>{' '}
            and it's structure can be readily adapted to your own site.
          </div>
          <div>
            Personally I have found this collection of frameworks together to be
            incredibly effective, and would very highly recommend it to anyone
            looking to setup a similar project and minimise time developing the
            actual site as to devote more effort to content itself - but still
            have the modularity and control that is lost through
            overly-simplified frameworks like Wordpress.
          </div>
          <div>
            I should preface the further details of this post with the fact that
            I will assume you know some{' '}
            <SiteLink href="https://reactjs.org/">React</SiteLink> and have
            enough web development experience to make even a very basic website.
          </div>
          <div>
            A major reason Next.js has been so seemless for this sort of project
            is largely attributable to how it handles page routing (as well as
            Vercel's automatic serverless deployments). Instead of having a
            Routes file close to your root component, Nextjs will automatically
            route your pages based on their directory location in a "pages"
            folder created automatically by{' '}
            <SiteCodeBlock>npx create-next-app</SiteCodeBlock>
            The other main benefit of Next.js though is that it is{' '}
            <span className="underline">server-side rendered</span>, which makes
            it far quicker than React
          </div>

          <div>
            For the most part, the structure and coding of the website is
            cleverly determined by the abstractions used in the{' '}
            <SiteLink href="https://github.com/ethanhusband/personalwebsite/tree/main/components">
              components folder
            </SiteLink>
            . What I did with these was made generic reusable components like
            Links, Codeblocks, Post Formats etc. and put my own styling on them,
            as to rarely have to apply styling to anything when writing content.
            While this is the very basic "dont repeat yourself" coding
            principle, I condensed them as much as possible, such as with
            PostSummary, meaning that folder is really all the coding that
            needed to be done, rendering this as a very very simple project
            code-wise.
          </div>
          <div>
            One thing you might be wondering is how on earth I added a comments
            section without a backend. Well what I found was a brilliant package
            called <SiteLink href="https://utteranc.es/">Utterances</SiteLink>.
            What this package (in fact, its not even a package, you just install
            it in Github and call it with a script tag) does is stores comments
            for pages as an Issue in your Github repository, removing the need
            for comment storage. The actual addition of Utterances is just done
            through a script in their docs you add to your site, but integrating
            this with React needs a bit of adaptation for which I used{' '}
            <SiteLink href="https://imkarthikeyans.hashnode.dev/how-to-add-comments-using-utterances-to-your-nextjs-blog">
              this great article here
            </SiteLink>
            , a disclaimer that in my site I added in one small bug fix myself
            which prevented duplicate comment sections from showing - this may
            happen for you too. Just copy mine - it's open source.
          </div>
          <div>
            As for tracking the site, originally I had Google Analytics
            installed. This was until I discovered that the Vercel console even
            tracks your analytics through Next.js, on top of everything else.
            Meaning no code requirements were necessary for analytics.
          </div>
        </div>
      </PostSummary>
    </div>
  )
}

export const ThisWebsiteSummary = () => {
  return (
    <PostSummary
      title="This Website"
      active
      isPageHeader={false}
      children={undefined}
      link="projects/This-Website"
      desc="Simple Typescript Nextjs blog site deployed with Vercel, requiring no backend"
    />
  )
}

export default ThisWebsite
