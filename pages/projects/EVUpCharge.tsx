import PostSummary from '../components/PostSummary'

export const EVUpCharge = () => {
  return (
    <div className="flex flex-col">
      <PostSummary
        title="EVUp Charge"
        link="/EVUpCharge"
        desc="Work - DD/MM/YY"
      >
        <div className="flex flex-col justify-center gap-y-4">
          <div>
            Since February 2022 to the present day, I've been employed as a Full
            Stack Engineer working on EVUp Charge, currently acting as the lead
            developer of the project. The largest of the projects listed, EVUp
            Charge is a comprehensive, scalable software that aims to facilitate
            charging facilities for the electric vehicle boom. With clients all
            around Australia, it offers reliable monitoring, monetisation, load
            balancing and sharing of OCPP electric vehicle charging stations
            around the country.
          </div>
          <div>
            The software started as a simple website built in React, then
            evolved into a microservice architecture managed by Google Cloud
            Platform (GCP), with a GraphQL backend as well as microservices for
            charging, payments and load management. Later came an app built with
            React Native.
          </div>
          <div></div>
        </div>
      </PostSummary>
    </div>
  )
}

export const EVUpChargeSummary = () => {
  return (
    <PostSummary
      title="EVUp Charge"
      active
      isPageHeader={false}
      children={undefined}
      link="/projects/EVUpCharge"
      desc="Large scale software aimed at connecting Australia to monitored, monetisable electric vehicle chargers"
    />
  )
}

export default EVUpCharge
