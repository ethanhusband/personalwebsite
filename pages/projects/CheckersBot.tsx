import PostSummary from '../../components/PostSummary'
import Image from 'next/image'
import { SiteCodeBlock } from '../../components/SiteCodeBlock'
import { SiteLink } from '../../components/SiteLink'

export const CheckersBot = () => {
  return (
    <div className="flex flex-col">
      <PostSummary
        title="Checkers Bot"
        link="/projects/CheckersBot"
        desc="Assignment - 21/10/2021"
      >
        <div className="flex flex-col justify-center gap-y-4">
          <h1 className="text-2xl text-secondary underline">
            Basic AI for Strategic Games
          </h1>
          <div>
            <SiteLink href="https://github.com/ethanhusband/checkers-bot">
              This is a simple AI written in C, designed to play checkers
            </SiteLink>
            . It accepts an input file detailing what pieces have moved where,
            and computes the best move from there using something called a{' '}
            <em>recursive minimax decision tree</em>. I'll explain here how it
            all works, and even how you can run it if you so wish. By the end,
            you'll be able to understand this image, and why it grants such a
            powerful technique.
          </div>
          <Image
            src="/assets/checkersbot/minimax-def.jpg"
            width={400}
            height={200}
            alt="Board Cost Example"
            className="mx-auto border-2 border-black rounded"
          />
          <div>
            What this program does first is it receives a position via an input
            file titled moves.txt, which contains on each line the source square
            and target square of each move sequentially. The program will decide
            whether each move is legal - rejecting the input if not. The
            moves.txt file then concludes with an A or P character followed by a
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
            As output, the moves in the input file first get printed to the
            terminal, using a basic ASCII graphical representation - after which
            it prints the moves it calculates (these are indicated by *
            characters). For example, the starting board looks like this in the
            terminal:
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
            <SiteLink href="https://en.wikipedia.org/wiki/Minimax">
              minimax decision tree
            </SiteLink>{' '}
            is the most fundamental model to any of these kinds programs which
            involve some sort of strategic decision making, especially in{' '}
            <SiteLink href="https://en.wikipedia.org/wiki/Zero-sum_game">
              zero-sum games.
            </SiteLink>{' '}
            Minimax trees are a concept initially arising from game theory,
            which has had widespread applications to AI involved in decision
            making - particularly in almost all zero-sum game scenarios.
          </div>
          <div>
            Let's break it down. How it works at the basic level, is it will
            first take some strategic scenario as an input (which we can do
            here, via the moves.txt file). From that, it will then calculate
            every possible move the currently moving player (let's call them,
            Player A) can make in the provided scenario. For each of those
            possible moves, it then calculates each possible move the opposing
            player might make. This process repeats until it reaches some
            specified <span className="underline">tree depth</span>, at which
            point it stops calculating possible moves - we call the nodes at
            this depth <span className="underline">terminal nodes</span>. The
            depth of the search tree in this project is set as a constant and
            can reach about 6 or 7 layers before becoming too slow. For the
            technically familiar, techniques such as branch pruning, dynamic
            depth limits and positional evaluation metrics were not applied but
            are expanded on <SiteLink href="./2048Bot">here</SiteLink> .
          </div>
          <Image
            src="/assets/checkersbot/minimax.png"
            width={500}
            height={400}
            alt="Minimax tree"
            className="bg-white border-2 border-black mx-auto rounded"
          />
          <div>
            We can see how this creates what is known as <em>the game tree</em>.
            If we had an infinitely powerful computer (or a simple enough game),
            we can continue this process to eventually consider every single
            possibility of where the game might go from the current position. So
            even if we generate all these possible outcomes, what now? How does
            it actually decide which move to select?
          </div>
          <div>
            Well when it has generated all the possible outcomes at these
            terminal nodes, only then does Minimax actually evaluate the board
            position. Now, how these terminal nodes are evaluated is a seperate
            problem - we need to find a way to know if a position is winning or
            losing. Quite simply, we can just count how many pieces each player
            has. Starting at 0, we add 1 for white, subtract 1 for black. This
            works out nicely, as a position that is good for Player A is usually
            a more positive number (like +3), and a position that is good for
            Player B is usually a more negative number (like -3) - a perfectly
            even position therefore should evaluate to 0. Note that this is a
            very simple method of <em>evaluation</em>. The top performing game
            engines will often go about this by training AI to recognise
            positions as good for one side or the other, and give it a number
            (to simplify). Note in the image below that the evaluation is
            referred to as cost:
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
            position is. This brings us back to our original problem - how do we
            use this to choose a move. One might think it would be as easy as
            choosing whichever 'branch' has the board with the best position.
            But that won't quite work, as the opposing player can simply choose
            moves to avoid ever reaching that position.
          </div>
          <div>
            What minimax trees do is they use a technique known as{' '}
            <span className="underline">backpropagation</span>. When a minimax
            tree evaluates all it's terminal nodes, we then employ the
            assumption that our opponent will play the best move possible at
            each turn (known as <em>perfect play</em>) - this is a great
            assumption, because if it's not true, then we're in even better
            stead because it means our opponent is playing sub-optimally.
          </div>
          <div>
            To choose a move, firstly we want to choose a batch of terminal
            nodes which come from the same node - this node they all sprout from
            is called their <span className="underline">parent node</span>. Then
            what we do is, if it were white's turn at the parent node, we set
            that parent node's score equal to the maximum score of the terminal
            nodes - <em>propagating</em> the score of white's best possible
            move. Similarly if it we're black's move at the parent node, we
            would instead propagate up the minimum score of the terminal nodes -
            assuming again the player at this particular node will play their
            best move (remember we were subtracting black's piece count in our
            evaluation, so black want's the outcome with the lowest or most
            negative score possible as this implies they have more pieces). This
            is where the 'minimax' name comes from, as we end up alternating
            between propagating the maximum and minimum scores
          </div>
          <div>
            We can do this with each set of nodes, repeatedly "propagating" the
            evaluation until the top layer is reached. At the top layer, we now
            have all an 'evaluation' of each move - we can just pick whichever
            is most desirable, dictating the move played.. This might take a bit
            of thinking for those not familiar with computing concepts like
            recursion and trees, but a good example of this propagation phase
            can be seen below. At position A, which would be the player with the
            white pieces, we would choose move B, can you see why?
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
            most engines for zero-sum strategy games work. The project I did
            this for was to be submitted as a single file, so the unnecessarily
            bloated source code at{' '}
            <SiteLink href="https://github.com/ethanhusband/checkers-bot/blob/main/checkersbot.c">
              this github repository
            </SiteLink>{' '}
            simply contains one large file with it's header declarations
            included. Once cloned, it can be run in a terminal (with the gcc
            C-compiler installed) with the following commands. You can also
            freely modify moves.txt to input any position you like.
          </div>
          <div>
            <SiteCodeBlock>
              gcc -Wall -ansi -o runme checkersbot.c
            </SiteCodeBlock>
            <SiteCodeBlock>./runme {'<'} moves.txt</SiteCodeBlock>
          </div>
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
      desc="Basic Decision Tree AI designed to play checkers, written in C"
    />
  )
}

export default CheckersBot
