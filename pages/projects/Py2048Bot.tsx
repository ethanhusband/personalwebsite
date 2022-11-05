import PostSummary from '../components/PostSummary'

export const Py2048Bot = () => {
  return <div></div>
}

export const Py2048BotSummary = ({ children }: any) => {
  return (
    <PostSummary
      title="2048 Bot"
      imgUrl="/assets/2048/2048.png"
      isPageHeader={false}
      link="/Py2048Bot"
      desc="An advanced 2048 AI with a Python frontend and C++ backend. Inspired by the bot created by nneonneo, it uses expectimax decision trees, bitboards and bitwise matrix operations to efficiently calculate each move leading to optimised performance, winning 100% of trials thus far."
    >
      {children}
    </PostSummary>
  )
}

export default Py2048Bot
