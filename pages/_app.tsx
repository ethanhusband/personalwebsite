import '../styles/globals.css'
import type { AppProps } from 'next/app'
import SitePage from '../components/SitePage'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SitePage>
      <Component {...pageProps} />
    </SitePage>
  )
}

export default MyApp
