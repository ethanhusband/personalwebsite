import PostSummary from '../components/PostSummary'

export const ThisWebsite = () => {
  return (
    <div className="flex flex-col">
      <PostSummary
        title="This Website"
        link="/EVUpCharge"
        desc="Personal Project - DD/MM/YY"
      >
        <div>
          This website itself is delivered on is a simple Typescript Nextjs site
          deployed with Vercel. Requiring no backend and with a frontend powered
          by tailwind, it is open source and clicking this section will provide
          instructions on how to create and deploy a blog / personal website for
          yourself
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
      link="projects/ThisWebsite"
      desc="Simple Typescript Nextjs blog site deployed with Vercel, requiring no backend"
    />
  )
}

export default ThisWebsite
