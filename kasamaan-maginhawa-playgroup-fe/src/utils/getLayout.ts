import { UnauthenticatedLayout } from '@/components/Layout/Unauthenticated'

export function getLayout(pathname: string) {
  return UnauthenticatedLayout
}
