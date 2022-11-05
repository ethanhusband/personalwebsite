import Link from 'next/link'
import Head from 'next/head'
import useMediaQuery from '@mui/material/useMediaQuery'

export const SitePage = ({ children }: any) => {
  return (
    <div className="w-screen bg-primary h-screen cursor-crosshair">
      <Head>
        <title>Ethan Husband</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-screen bg-mandelbrot h-screen cursor-crosshair">
        <NavBar />
        <div className="px-24 py-20">{children}</div>
      </div>
    </div>
  )
}

// Should make this highlight whichever page/subpage is currently active
export const NavBar = () => {
  const buttonClass = `button-hover w-1/4 py-2 w-auto max-w-200px rounded-2xl text-center ${
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
      <Link href="/" className={buttonClass}>
        <li>CV</li>
      </Link>
    </ul>
  )

  return (
    <div className="z-50 fixed top-0 right-0 left-0 bg-black mx-auto rounded-b-3xl fixedAWSD border-secondary border-b white-shadow">
      {navbar}
    </div>
  )
}

export default SitePage
