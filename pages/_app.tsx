import '../styles/globals.css'
import type { AppProps } from 'next/app'
import SitePage from '../components/SitePage'
import { Analytics } from '@vercel/analytics/react'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  if (router.asPath === '/resume') {
    return (
      <iframe
        className="w-full h-screen "
        src="/assets/pdfs/Ethan_Husband_Resume.pdf"
      />
    )
  }

  return (
    <SitePage>
      <Component {...pageProps} />
      <Analytics />
    </SitePage>
  )
}

export default MyApp
