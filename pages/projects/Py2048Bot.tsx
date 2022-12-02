import PostSummary from '../components/PostSummary'

export const Py2048Bot = () => {
  return (
    <PostSummary
      title="2048 Bot"
      link="/Py2048Bot"
      desc="Personal Project - DD/MM/YY"
    >
      <div>
        An advanced 2048 AI with a Python frontend and C++ backend. Inspired by
        the bot created by nneonneo, it uses expectimax decision trees,
        bitboards and bitwise matrix operations to efficiently calculate each
        move leading to optimised performance, winning 100% of trials thus far.
      </div>
    </PostSummary>
  )
}

export const Py2048BotSummary = () => {
  return (
    <PostSummary
      title="2048 Bot"
      isPageHeader={false}
      children={undefined}
      link="/Py2048Bot"
      desc="An advanced 2048 AI with a Python frontend and C++ backend, maintaining a 100% win rate"
    />
  )
}

export default Py2048Bot
