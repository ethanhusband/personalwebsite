import Link from 'next/link'
import PostSummary from '../components/PostSummary'
import Image from 'next/image'
import { CopyBlock } from 'react-code-blocks'

export const CheckersBot = () => {
  return (
    <div className="flex flex-col">
      <PostSummary
        title="Checkers Bot"
        link="/CheckersBot"
        desc="Assignment - 21/10/2021"
      >
        <div className="flex flex-col justify-center gap-y-4">
          <div>
            <Link
              className="text-secondary"
              target="_blank"
              href="https://github.com/ethanhusband/checkers-bot"
            >
              This is a simple AI written in C, designed to play checkers
            </Link>
            . It accepts an input file detailing what pieces have moved where,
            and computes the best move from there using a recursive minimax
            decision tree.
          </div>
          <div>
            What the program does is first it receives a position via an input
            file, usually titled moves.txt, which contains on each line the
            source square and target square of each sequential move. The program
            will decide whether each move is legal - rejecting the input if not.
            The file then concludes with an A or P character followed by a
            newline, where A instructs the program to play one move after the
            position given, P instructs playing the next best 10 moves. Here is
            an example of one of those input files.
          </div>
          <Image
            src="/assets/checkersbot/movestext.png"
            width={200}
            height={100}
            alt="moves.txt"
            className="mx-auto border-2 border-black rounded"
          />
          <div>
            The program represents it's output by printing out the moves in the
            input file to the terminal, using a basic ASCII graphical
            representation. It will then print the moves it decides to play,
            indicating the move was calculated in the UI with *** at the start.
            For example, the starting board looks like this in the terminal:
          </div>
          <Image
            src="/assets/checkersbot/checkersbot.png"
            width={250}
            height={200}
            alt="Board Cost Example"
            className="mx-auto border-2 border-black rounded"
          />
          <div>
            But how do bots like this, and also those for games like Chess and
            Go, actually calculate these moves? For those unfamiliar, a{' '}
            <Link
              href="https://en.wikipedia.org/wiki/Minimax"
              className="text-secondary"
              target="_blank"
            >
              minimax decision tree
            </Link>{' '}
            is a model often employed by programs which involve some sort of
            strategic decision making, especially in{' '}
            <Link
              href="https://en.wikipedia.org/wiki/Zero-sum_game"
              className="text-secondary"
              target="_blank"
            >
              zero-sum games
            </Link>{' '}
            - it is a concept initially arising from game theory which has had
            widespread applications to a large proportion of AI involved in
            decision making - particularly in almost all zero-sum game
            scenarios. It is the crux of many if not all engines/AI that
            calculate moves for two player strategic games such as Chess, Go and
            of course Checkers.
          </div>
          <div>
            How it works at the basic level, is it will first take some
            strategic scenario as an input (which we can do here, via the
            moves.txt file). It will then calculate every possible move the
            currently moving player (let's call them, Player A) can make in the
            provided scenario. For each of those possible moves, it then
            calculates each possible move the opposing player might make. This
            process repeats until it reaches some specified{' '}
            <span className="underline">tree depth</span>, at which point it
            stops calculating possible moves - we call the nodes at this depth{' '}
            <span className="underline">terminal nodes</span>. The depth of the
            search tree in this project is set as a constant and can reach about
            6 or 7 layers before becoming too slow. For the technically
            familiar, techniques such as branch pruning, dynamic depth limits
            and positional evaluation metrics were not applied.
          </div>
          <Image
            src="/assets/checkersbot/minimax.png"
            width={500}
            height={400}
            alt="Minimax tree"
            className="bg-white border-2 border-black mx-auto rounded"
          />
          <div>
            So it has generated all these possible outcomes, what now? How does
            it actually decide which move to select? Well when it has generated
            all the possible outcomes at these terminal nodes, only then does
            Minimax actually evaluate the board position. Now, how these
            terminal nodes are evaluated is a seperate problem. Positions will
            almost always have a number corresponding to who is winning,
            essentially - called the{' '}
            <span className="underline">evaluation</span>. A position that is
            good for Player A is usually a more positive number (like +3.84),
            and a position that is good for Player B is usually a more negative
            number (like -3.84) - a perfectly even position therefore should
            evaluate to 0, if your evaluation method is good. Top game engines
            will often go about this by training AI to recognise positions as
            good for one side or the other, and give it a number (to simplify).
          </div>
          <div>
            For this program, we use a very simple evaluation metric known in
            Chess as <span className="underline">material counting</span>. More
            sophisticated evaluation techniques are not the focus of the
            project. Firstly, I should add that in this version of checkers,
            when a piece reaches the end of the board it becomes a "tower", and
            can move both ways. This is distinguished in the graphical
            representation by a capital W or B and is considered worth 3 points
            of material - a normal piece being worth 1. So to evaluate a
            position, we simply start at zero, +1 for each white piece, +3 for
            each white tower, -1 for each black piece, -3 for each black tower.
            See an example of the board cost below, where black (Player B) has
            one more piece than white (Player A).
          </div>
          <Image
            src="/assets/checkersbot/costexample.png"
            width={250}
            height={200}
            alt="Board Cost Example"
            className="mx-auto border-2 border-black rounded"
          />
          <div>
            So this is what we use to evaluate the terminal nodes - how good a
            position is. After the terminal nodes are evaluated, minimax enters
            it's <span className="underline">propagation phase</span>. When a
            minimax tree evaluates all it's terminal nodes, it then employs the
            assumption that each player will play the best move possible - an
            assumption fundamental to game theory which ends up being
            particularly effective. Firstly, at each{' '}
            <span className="underline">parent node</span> of these terminal
            nodes, if it were white's turn at the parent node, it would set that
            parent node's score equal to the maximum score of the terminal nodes
            - therefore assuming white will play the best move at that point to
            reach the next best position. Similarly if it we're black's move at
            the parent node, it would instead pass up the minimum score of the
            terminal nodes - assuming again they will play the best move. This
            process repeats, "propagating" the evaluation until the top layer is
            reached, where the move resulting in most ideal evaluation for the
            current player will be selected.
          </div>
          <div>
            This might take a bit of thinking for those not familiar with
            computing concepts like recursion and trees, but a good example of
            this propagation phase can be seen below. At position A, the move
            that reaches position B will be selected.
          </div>
          <Image
            src="/assets/checkersbot/minimaxProp.png"
            width={400}
            height={400}
            alt="Minimax tree propagation"
            className="mx-auto border-2 border-black rounded"
          />

          <div></div>
          <div>
            That covers the basic details of how the bot works, and in fact, how
            most engines for zero-sum strategy games work. The project was to be
            submitted as a single file, so the source code at{' '}
            <Link
              className="text-secondary"
              target="_blank"
              href="https://github.com/ethanhusband/checkers-bot/blob/main/checkersbot.c"
            >
              this github repository
            </Link>{' '}
            simply contains one large file with it's header declarations
            included. Once cloned, it can be run in a terminal (with the gcc
            C-compiler installed) with the following commands. You can also
            freely modify moves.txt to input any position you like.
          </div>
          <CopyBlock
            text="gcc -Wall -ansi -o runme checkersbot.c"
            language="powershell"
            theme="github"
          />
          <CopyBlock
            text="./runme < moves.txt"
            language="powershell"
            theme="github"
          />
          <div>
            This was the first project I ever truly worked on and had to "figure
            out", and while it may not necessarily be code with a cleanliness or
            design patterns I pride myself on, it was an initial leap I look
            back on as pivotal, introducing me at the time to the power held in
            even the most basic coding ability.
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
