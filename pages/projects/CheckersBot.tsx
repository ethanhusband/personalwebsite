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
            The input file, usually titled moves.txt, contains a move on each
            line detailing the source square and target square. The program will
            decide whether the move is valid. The file concludes with an A or P
            character, where A indicates the program to play one move after what
            was specified, P indicates playing and printing the next best 10
            moves.
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
