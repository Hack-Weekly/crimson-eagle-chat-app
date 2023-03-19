import { ThemeContextProvider } from '@/hooks/useTheme'
import '@/styles/globals.css'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'

import type { AppProps } from 'next/app'

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page): ReactNode => page)
  return (
    <ThemeContextProvider>
      {getLayout(<Component {...pageProps} />)}
    </ThemeContextProvider>
  )
}
