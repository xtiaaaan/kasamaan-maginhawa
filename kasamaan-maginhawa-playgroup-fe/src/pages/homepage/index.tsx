import { NextPage } from 'next'
import dynamic from 'next/dynamic'

const HomepageComponent = dynamic(() => import('@/pageAssets/homepage'))

const HomePage: NextPage = () => {
  return <HomepageComponent />
}

export default HomePage