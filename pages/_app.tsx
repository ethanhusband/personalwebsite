import '../styles/globals.css'
import type { AppProps } from 'next/app'
import SitePage from '../components/SitePage'
import { Analytics } from '@vercel/analytics/react'
import { useRouter } from 'next/router'
import { redirect } from 'next/navigation'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  if (router.asPath === '/resume') {
    redirect('https://resume.io/r/ISDvy31OM')
    /*return (
      <iframe
        className="w-full h-screen"
        allow="true"
        src="/assets/pdfs/Ethan_Husband_Resume.pdf"
      />
    )*/
  }

  return (
    <SitePage>
      <Component {...pageProps} />
      <Analytics />
    </SitePage>
  )
}

export default MyApp
