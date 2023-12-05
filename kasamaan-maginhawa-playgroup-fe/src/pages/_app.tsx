import '@/styles/globals.css'
import { ReactNode } from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { getLayout } from '@/utils/getLayout'

const WrapperLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { pathname } = useRouter()
  const Layout = getLayout(pathname)

  return <Layout>{children}</Layout>
} 

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WrapperLayout>
      <Component {...pageProps} />
    </WrapperLayout>
  )
}
