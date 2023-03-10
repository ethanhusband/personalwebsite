import '../styles/globals.css'
import type { AppProps } from 'next/app'
import SitePage from '../components/SitePage'
import { Analytics } from '@vercel/analytics/react'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SitePage>
      <Component {...pageProps} />
      <Analytics />
    </SitePage>
  )
}

export default MyApp
