import PostSummary from '../components/PostSummary'

export const CheckersBot = () => {
  return <div></div>
}

export const CheckersBotSummary = ({ children }: any) => {
  return (
    <PostSummary
      title="Checkers Bot"
      imgUrl="/assets/checkersbot/checkersbot.png"
      isPageHeader={false}
      link="/CheckersBot"
      desc="A simple AI written in C designed to play checkers. Accepts an input file detailing what pieces have moved where, and computes the best move from there using a recursive minimax decision tree."
    >
      {children}
    </PostSummary>
  )
}

export default CheckersBot
