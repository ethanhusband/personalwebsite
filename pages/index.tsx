import type { NextPage } from 'next'
import SitePage, { NavBar } from './components/SitePage'
import React, { useRef, useEffect } from 'react'
import Link from 'next/link'

const Home: NextPage = () => {
  // To accomodate background image, this component does not use SitePage
  return <ExploreButton />
}

const ExploreButton = () => {
  return (
    <div className="centered-button">
      <Link href="/Blog">
        <div className="flex flex-row justify-center px-12 py-4 explore-effects self-center rounded-lg border-2 border-black">
          <p className="text-center text-2xl">Explore</p>
        </div>
      </Link>
    </div>
  )
}

// This is merely used to render the images seen at index page - not in use
export const Mandelbrot = (props: any) => {
  const canvasRef = useRef(null)

  const draw = (cont: any) => {
    const atom = (x: number, y: number, c: string) => {
      cont.fillStyle = c
      cont.fillRect(x, y, 3, 3)
    }

    var width = 2000
    var height = 1500
    var zoom = 200
    var width_increment = 4 / width
    var height_increment = 2 / height

    var m = 0
    var n = 0

    while (m <= width + 1) {
      var x = (m - 850) / (200 + zoom)
      var y = (n - 400) / (200 + zoom)
      var xcord = -0.74529
      var ycord = -0.113075
      var iteration = 0
      var max_iteration = 50000
      var xtemp
      var colour

      while (x < 2 && y < 2 && iteration < max_iteration) {
        xtemp = x * x - y * y + xcord
        y = 2 * x * y + ycord
        x = xtemp
        iteration = iteration + 1
      }

      if (iteration === max_iteration) {
        colour = 'rgb(0,0,0)'
      } else {
        colour =
          'rgb(' + iteration + ',' + iteration * 0.5 + ',' + iteration * 3 + ')'
      }

      atom(m, n, colour)

      ycord = ycord - height_increment
      n = n + 1

      if (n === height) {
        xcord = xcord + width_increment
        ycord = 1
        m = m + 1
        n = 0
      }
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current as any
    const context = canvas.getContext('2d')

    draw(context)
  }, [])

  return <canvas width="2000" height="1500" ref={canvasRef} {...props} />
}

export default Home
