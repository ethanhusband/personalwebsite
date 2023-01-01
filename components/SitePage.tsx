import Link from 'next/link'
import Head from 'next/head'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import * as gtag from '../utils/gtag'

export const SitePage = ({ children }: any) => {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  // There is an annoying problem here that we cant apply a flex-col to the children of the element.
  // The reason it doesn't apply properly is because any time we have the children exported as a function,
  // that function needs to return it's items inside a single div, ruining how it is intended to apply.
  return (
    <div className="w-screen bg-mandelbrot h-full cursor-crosshair">
      <Head>
        <title>Ethan Husband - {lastPath(router.asPath) || 'Explore'}</title>
        <meta name="description" content="Personal Website for Ethan Husband" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-screen h-full min-h-screen cursor-crosshair">
        <NavBar />
        <div className="py-32 px-4 mb-8">{children}</div>
      </div>
    </div>
  )
}

// Should make this highlight whichever page/subpage is currently active
export const NavBar = () => {
  const buttonClass = `button-hover w-1/4 py-2 max-w-200px rounded-2xl text-center ${
    useMediaQuery('(max-width:375px)') ? 'text-sm' : 'text-base'
  }`

  var navbar = (
    <ul className="text-secondary font-semibold px-4 py-6 flex flex-row gap-x-4 justify-center">
      <Link href="/Blog" className={buttonClass}>
        <li>Blog</li>
      </Link>
      <Link href="/Projects" className={buttonClass}>
        <li>Projects</li>
      </Link>
      <Link href="/About" className={buttonClass}>
        <li>About</li>
      </Link>
      {/* <Link href="/" className={buttonClass}>
        <li>CV</li>
  </Link> */}
    </ul>
  )

  return (
    <div className="z-50 fixed top-0 right-0 left-0 bg-black mx-auto rounded-b-3xl fixedAWSD nav-border">
      {navbar}
    </div>
  )
}

function lastPath(string: string) {
  return string.substr(string.lastIndexOf('/') + 1)
}

export default SitePage
