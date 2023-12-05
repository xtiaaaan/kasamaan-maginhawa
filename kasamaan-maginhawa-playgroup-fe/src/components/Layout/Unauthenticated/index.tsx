import { Layout } from 'antd'
import { ReactNode } from 'react'
import Topbar from './topbar'

export const UnauthenticatedLayout: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <Layout>
        <Topbar/>
        {children}
    </Layout>
  )
}
