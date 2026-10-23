import { useLoaderData } from 'react-router'

import { Background } from '@/widgets/background'
import type { Locale } from '@/shared/config/locales'

const LandingPage = () => {
  const { lang } = useLoaderData() as { lang: Locale }

  return (
    <Background>
      <h1>Landing: {lang}</h1>
    </Background>
  )
}

export default LandingPage
