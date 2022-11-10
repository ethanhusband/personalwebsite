import PostSummary from '../components/PostSummary'

export const EVUpCharge = () => {
  return (
    <PostSummary
      title="EVUp Charge"
      isPageHeader={true}
      link="/EVUpCharge"
      desc="Work - DD/MM/YY"
    >
      <div>
        The largest of the projects listed, EVUp Charge is a comprehensive,
        scalable software that aims to facilitate the electric vehicle boom.
        With clients all around Australia, it offers reliable monitoring,
        monetisation, load balancing and sharing of OCPP electric vehicle
        charging stations around the country.
      </div>
    </PostSummary>
  )
}

export const EVUpChargeSummary = () => {
  return (
    <PostSummary
      title="EVUp Charge"
      isPageHeader={false}
      children={undefined}
      link="/EVUpCharge"
      desc="Large scale software aimed at connecting Australia to monitored, monetisable electric vehicle chargers"
    />
  )
}

export default EVUpCharge
