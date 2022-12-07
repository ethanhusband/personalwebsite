import PostSummary from '../components/PostSummary'

export const ReactMandelbrot = () => {
  return (
    <div className="flex flex-col">
      <PostSummary
        title="React Mandelbrot Set Renderer"
        link="projects/ReactMandelbrot"
        desc="Personal Project - DD/MM/YY"
      >
        <div>
          While somewhat of an ironic project given this is the type of
          rendering React is clearly not optimised for, this provides a means
          for React developers to easily render a decent quality Mandelbrot set
          image without the need for learning more up-to-the-task libraries like
          OpenGL or Pillow
        </div>
        <div>The </div>
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
