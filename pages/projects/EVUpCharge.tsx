import PostSummary from '../components/PostSummary'

export const EVUpCharge = () => {
  return <div></div>
}

export const EVUpChargeSummary = ({ children }: any) => {
  return (
    <PostSummary
      title="EVUp Charge"
      imgUrl="/assets/evup/EVUp.png"
      isPageHeader={false}
      link="/EVUpCharge"
      desc="The largest of the projects listed, EVUp Charge is a comprehensive, scalable software that aims to facilitate the electric vehicle boom. With clients all around Australia, it offers reliable monitoring, monetisation, load balancing and sharing of OCPP electric vehicle charging stations around the country."
    >
      {children}
    </PostSummary>
  )
}

export default EVUpCharge
