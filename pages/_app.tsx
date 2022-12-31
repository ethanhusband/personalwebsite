import '../styles/globals.css'
import type { AppProps } from 'next/app'
import SitePage from '../components/SitePage'
import { Analytics } from '@vercel/analytics/react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SitePage>
      <Component {...pageProps} />
      <Analytics />
    </SitePage>
  )
}

export default MyApp
