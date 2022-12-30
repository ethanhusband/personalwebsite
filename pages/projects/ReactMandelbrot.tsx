import PostSummary from '../../components/PostSummary'
import { SiteLink } from '../../components/SiteLink'
import Image from 'next/image'

export const ReactMandelbrot = () => {
  return (
    <div className="flex flex-col">
      <PostSummary
        title="React Mandelbrot Set Renderer"
        link="projects/ReactMandelbrot"
        desc="Personal Project - DD/MM/YY"
      >
        <div className="flex flex-col gap-y-4">
          <div>
            A basic rendering of the famous{' '}
            <SiteLink href="https://fractalfoundation.org/resources/what-are-fractals/">
              fractal
            </SiteLink>{' '}
            known as the Mandelbrot Set, which was used as the background image
            for this website. Unfortunately, this project will require an
            understanding of React to grasp.
          </div>
          <div>
            While somewhat of an ironic project given this is the type of
            rendering React is clearly not optimised for, this provides a means
            for React developers to easily render a decent quality Mandelbrot
            set image without the need for learning more up-to-the-task
            libraries like OpenGL or Pillow
          </div>
          <div>
            If you're wondering how such beautiful images get rendered simply by
            mathematics, I won't be able to do the explanation anymore justice
            than{' '}
            <SiteLink href="https://plus.maths.org/content/what-mandelbrot-set">
              this article here
            </SiteLink>
            . For those who aren't interested in the mathematical details, it
            repeatedly applies a specific function to all points in a plane (in
            particular the complex plane) and those which diverge to become
            infinitely large are coloured differently to those that don't -
            depicting the Mandelbrot Set.
          </div>
          <div>
            As for how this is done in React, the implementation itself is at{' '}
            <SiteLink href="https://github.com/ethanhusband/react-mandelbrot/blob/main/Downloads/mandelbrot/mandelbrot-zoom/src/Canvas.js">
              this page
            </SiteLink>
            , there is also a raw html render in the root directory. To render
            the points it uses the{' '}
            <SiteLink href="https://www.w3schools.com/html/html5_canvas.asp">
              HTML Canvas component
            </SiteLink>
            . The details of how canvas elements work are somewhat necessary to
            fully understand how this works. The component defines a 'draw'
            function which takes the current frame and canvas reference to
            modify the actual graphics on the screen. In order to actually
            animate the set and zoom in somewhere, we use a useEffect which is
            called each time we draw, therefore repeating the process and
            calling a render function inside each time. Do note that the
            animation is extremely slow - as I said this is something React is
            not optimised for.
          </div>
          <div>Some of the final product renders can be seen below:</div>
          <Image
            src="/assets/mandelbrot/mandelbrot5.png"
            alt=""
            quality={100}
            width={700}
            height={200}
            className="mx-auto border border-black rounded"
          />
          <Image
            src="/assets/mandelbrot/mandelbrotProj.png"
            alt=""
            quality={100}
            width={500}
            height={200}
            className="mx-auto border border-black rounded"
          />
        </div>
      </PostSummary>
    </div>
  )
}

export const ReactMandelbrotSummary = () => {
  return (
    <PostSummary
      title="React Mandelbrot Set Renderer"
      isPageHeader={false}
      children={undefined}
      link="projects/ReactMandelbrot"
      desc="A simple single file render of the Mandelbrot Set, done in React for accessibility sake"
    />
  )
}

/*<Image
className="rounded my-auto ml-3 "
src={imgUrl}
alt={title}
width={imgWidth}
height={imgHeight}
quality={100}
/>*/

export default ReactMandelbrot
