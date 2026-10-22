import { useParams } from 'react-router'

import { Background } from '@/widgets/background'
import { isLocale } from '@/shared/config/locales'

import { useLandingData } from './model/useLandingData'

const LandingPage = () => {
  const { lang } = useParams()
  const locale = lang && isLocale(lang) ? lang : 'en'
  const { error } = useLandingData(locale)

  return (
    <Background>
      <h1>Landing: {locale}</h1>
      {error && <p>{error.message}</p>}
    </Background>
  )
}

export default LandingPage
