import { useLoaderData } from 'react-router'

import type { Locale } from '@/shared/config/locales'


const LandingPage = () => {
  const { lang } = useLoaderData() as { lang: Locale }
  return (
      <h1>Landing: {lang}</h1>
  )
}

export default LandingPage
