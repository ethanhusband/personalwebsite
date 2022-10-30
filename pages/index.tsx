import type { NextPage } from 'next'
import SitePage from './SiteHeader'
import React, { useRef, useEffect, useState, memo } from 'react'

const Home: NextPage = () => {
  return (
    <SitePage>
    <div className="bg-white">
      
    </div>
    </SitePage>
  )
}
//<p className="fixed right-auto left-auto top-auto bottom-auto z-50 bg-black blue-shadow text-white">Explore</p>

export const Mandelbrot = (props: any) => {
  const canvasRef = useRef(null)

  const draw = (cont: any) => {
    var zoom = 5.072568257 * 10000000
    const colorMultipler1 = 2 
    const colorMultipler2 = 1

    const atom = (x: any, y: any, c: any) => {
      cont.fillStyle = c
      cont.fillRect(x, y, 3, 3)
    }

    for (var y = 1; y < 2000; y++) {
      for (var x = 1; x < 2000; x++) {
        // Zoom points:
        // -0.233, -0.655
        // -0.12, -0.82
        // -0.74529, -0.113075
        const dx = (x - 750) / (200 + zoom) - 0.74529
        const dy = (y - 250) / (200 + zoom) - 0.113075
        var a = dx
        var b = dy
        for (var t = 1; t < 50000; t++) {
          var d = a * a - b * b + dx
          b = 2 * (a * b) + dy
          a = d
          const H = d > 200
          if (H) {
            atom(
              x,
              y,
              'rgb(' +
                t  +
                ',' +
                t * 0.5+
                ',' +
                t * 3 +
                ')',
            )
            break
          }
        }
      }
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current as any
    const context = canvas.getContext('2d')

    draw(context)
  }, [])

  return <canvas width="2000" height="2000" ref={canvasRef} {...props} />
}

export default Home
