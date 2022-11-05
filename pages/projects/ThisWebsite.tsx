import PostSummary from '../components/PostSummary'

export const ThisWebsite = () => {
  return <div></div>
}

export const ThisWebsiteSummary = ({ children }: any) => {
  return (
    <PostSummary
      title="This Website"
      imgUrl="/assets/personalwebsite/personalwebsite.png"
      isPageHeader={false}
      link="/EVUpCharge"
      desc="This website itself is delivered on is a simple Typescript Nextjs site deployed with Vercel. Requiring no backend and with a frontend powered by tailwind, it is open source and clicking this section will provide instructions on how to create and deploy a blog / personal website for yourself."
    >
      {children}
    </PostSummary>
  )
}

export default ThisWebsite
