import PostSummary from '../components/PostSummary'

export const CheckersBot = () => {
  return (
    <PostSummary
      title="Checkers Bot"
      isPageHeader={true}
      link="/CheckersBot"
      desc="Assignment - DD/MM/YY"
    >
      <div>
        AI written in C designed to play checkers. Accepts an input file
        detailing what pieces have moved where, and computes the best move from
        there using a recursive minimax decision tree.
      </div>
    </PostSummary>
  )
}

export const CheckersBotSummary = ({ children }: any) => {
  return (
    <PostSummary
      title="Checkers Bot"
      isPageHeader={false}
      children={undefined}
      link="/CheckersBot"
      desc="Decision Tree AI designed to play checkers, written in C"
    />
  )
}

export default CheckersBot
