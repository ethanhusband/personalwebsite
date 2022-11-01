import Link from 'next/link'
import Head from 'next/head'
import useMediaQuery from '@mui/material/useMediaQuery'
import { FaBars } from 'react-icons/fa'

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

export const NavBar = () => {
  const menu = useMediaQuery('(max-width:330px)')
  console.log('Menu is', menu)
  const buttonClass = `button-hover w-1/4 py-1.5 max-w-200px rounded-2xl text-center ${
    menu ? 'text-xs' : 'text-base'
  }`

  var navbar = (
    <ul className="text-secondary font-semibold px-4 py-6 flex flex-row gap-x-3 justify-center">
      <Link href="/Blog">
        <li className={buttonClass}>Blog</li>
      </Link>
      <Link href="/Projects">
        <li className={buttonClass}>Projects</li>
      </Link>
      <Link href="/About">
        <li className={buttonClass}>About</li>
      </Link>
      <li className={buttonClass}>CV</li>
    </ul>
  )

  return (
    <div className="z-50 fixed top-0 right-0 left-0 bg-black mx-auto rounded-b-3xl fixedAWSD border-secondary border-b white-shadow">
      {navbar}
    </div>
  )
}

export default SitePage
