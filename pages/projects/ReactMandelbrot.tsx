import PostSummary from '../components/PostSummary'

export const ReactMandelbrot = () => {
  return <div></div>
}

export const ReactMandelbrotSummary = ({ children }: any) => {
  return (
    <PostSummary
      title="React Mandelbrot Set Renderer"
      imgUrl="/assets/mandelbrot/mandelbrotProj.png"
      isPageHeader={false}
      link="/ReactMandelbrot"
      desc="While somewhat of an ironic project given this is something React is clearly not optimised for, this provides a means for React developers to easily render a decent quality Mandelbrot set image without the need for learning more up-to-the-task libraries like OpenGL or Pillow."
    >
      {children}
    </PostSummary>
  )
}

export default ReactMandelbrot
