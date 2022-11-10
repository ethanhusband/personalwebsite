import PostSummary from '../components/PostSummary'

export const EVChargerDLB = () => {
  return (
    <PostSummary
      title="Dynamic Load Balancing for EV Chargers"
      isPageHeader={true}
      link="articles/EVChargerDLB"
      desc="Ethan Husband - DD/MM/YY"
    >
      <div></div>
    </PostSummary>
  )
}

export const EVChargerDLBSummary = () => {
  return (
    <PostSummary
      title="Dynamic Load Balancing for EV Chargers"
      isPageHeader={false}
      children={undefined}
      link="articles/EVChargerDLB"
      desc="An algorithm to balance amperage distribution across a set of OCPP chargers, without exceeding a given grid capacity."
    />
  )
}
