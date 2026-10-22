import { useState } from 'react'
import { useParams } from 'react-router'

import { Background } from '@/widgets/background'
import { Preloader } from '@/widgets/preloader'
import { isLocale } from '@/shared/config/locales'

import { useLandingData } from './model/useLandingData'

const LandingPage = () => {
  const { lang } = useParams()
  const locale = lang && isLocale(lang) ? lang : 'en'
  const { isLoading, error } = useLandingData(locale)
  const [isPreloaderDone, setIsPreloaderDone] = useState(false)

  return (
    <Background>
      <Preloader isLoading={isLoading} onFinish={() => setIsPreloaderDone(true)} />
      {isPreloaderDone && (
        <>
          <h1>Landing: {locale}</h1>
          {error && <p>{error.message}</p>}
        </>
      )}
    </Background>
  )
}

export default LandingPage
