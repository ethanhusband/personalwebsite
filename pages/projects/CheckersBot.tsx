import Link from 'next/link'
import PostSummary from '../components/PostSummary'
import Image from 'next/image'

export const CheckersBot = () => {
  return (
    <div className="flex flex-col">
      <PostSummary
        title="Checkers Bot"
        isPageHeader={true}
        link="/CheckersBot"
        desc="Assignment - DD/MM/YY"
      >
        <div className="flex flex-col justify-center gap-y-4">
          <div>
            AI written in C designed to play checkers. Accepts an input file
            detailing what pieces have moved where, and computes the best move
            from there using a recursive minimax decision tree.
          </div>
          <div>
            For those unfamiliar, a minimax decision tree is a model often
            employed by programs which involve some sort of strategic decision
            making - it is a concept initially arising from game theory which
            has had widespread applications to a large proportion of artificial
            intelligence' involved in decision making. It is the crux of many
            engines for two player strategic games such as Chess, Go and of
            course Checkers.
          </div>
          <div>
            How it works at the basic level, is it will first take some
            strategic scenario as an input. It will then calculate every
            possible move the player can make given the scenario. For each of
            those possible moves, it then calculates each possible move the
            opposing player might make. This process repeats until it reaches
            some specified 'tree depth', at which point it stops and evaluates
            every board position possible at that depth - we call the nodes at
            this depth 'terminal nodes'.
          </div>
          <Image
            src="/assets/checkersbot/minimax.png"
            width={400}
            height={400}
            alt="Minimax tree"
          />
          <div>
            How these terminal nodes are evaluated is a seperate problem.
            Positions will almost always have an evaluation which is just a
            number. A position that is good for white is usually a more positive
            number and a position that is good for black is usually a more
            negative number - a perfectly even position therefore should
            evaluate to 0. Top game engines will often train AI to recognise
            positions as good for one side or the other, and give it a number
            (to simplify). Here, we simply start at zero, add 1 for each white
            piece, subtract 1 for each black piece. See the example of the board
            cost below
          </div>
          <div>
            When a minimax tree evaluates all it's terminal nodes, it then uses
            the assumption that each player will play the best move possible -
            an unrealistic assumption fundamental to game theory which ends up
            being particularly effective. Hence, at the layer above these
            terminal nodes, if it were whites turn it would propagate the score
            of the child node which had the highest evaluation - it assumes
            white will find the best move. Similarly if it we're black's move at
            the second last layer, it would pass up the minimum score of the
            child nodes - assuming black will play the best move. This continues
            until the top layer where the most desirable move for the current
            player is selected. An example of this propagation can be seen
            below.
          </div>
          <Image
            src="/assets/checkersbot/minimaxProp.png"
            width={400}
            height={400}
            alt="Minimax tree propagation"
          />
          <div>
            That's the basic idea of how the bot works. How it receives a
            position is via an input file, usually titled moves.txt, which
            contains a move on each line detailing the source square and target
            square. The program will decide whether the move is valid. The file
            concludes with an A or P character, where A indicates the program to
            play one move after what was specified, P indicates playing and
            printing the next best 10 moves.
          </div>
          <div>
            The program will first print out the moves that have occurred using
            a basic ASCII graphical representation. It will then print the moves
            it decides to play, indicated the move was calculated in the UI with
            '***' at the start. Note the 'Board Cost', which is it's evaluation
            metric and very simply equivalent to the material count. The depth
            of the search tree can be set as a constant 3 but can reach about 6
            or 7 before becoming too slow. Techniques such as branch pruning,
            dynamic depth limits and positional evaluation metrics were not
            applied. For the following moves file, an example of the program in
            action below:
          </div>
          <Image
            src="/assets/checkersbot/movestext.png"
            width={200}
            height={100}
            alt="moves.txt"
          />
          <div></div>
          <div>
            The source code was to be submitted as a single file, so the source
            code at{' '}
            <Link
              className="text-secondary"
              href="https://github.com/ethanhusband/checkers-bot/blob/main/checkersbot.c"
            >
              this github repository
            </Link>{' '}
            simply contains one large file with it's header declarations
            included.
          </div>
          <div>
            This was the first project I ever truly worked on and had to 'figure
            out', and while it may not necessarily be code with a cleanliness I
            pride myself on, it was an initial leap I look back on as pivotal,
            introducing me at the time to the power held in even a basic coding
            ability.
          </div>
        </div>
      </PostSummary>
    </div>
  )
}

export const CheckersBotSummary = ({ children }: any) => {
  return (
    <PostSummary
      title="Checkers Bot"
      isPageHeader={false}
      children={undefined}
      link="projects/CheckersBot"
      desc="Decision Tree AI designed to play checkers, written in C"
    />
  )
}

export default CheckersBot
