import { Suspense, useState } from 'react'
import { Await, useLoaderData } from 'react-router'

import { Background } from '@/widgets/background'
import { Preloader } from '@/widgets/preloader'

import type { loader } from './model/loader'
import { useIsPending } from './model/useIsPending'

const LandingPage = () => {
  const { lang, data } = useLoaderData<typeof loader>()
  const isLoading = useIsPending(data)
  const [isPreloaderDone, setIsPreloaderDone] = useState(false)

  return (
    <Background>
      <Preloader isLoading={isLoading} onFinish={() => setIsPreloaderDone(true)} />

      {isPreloaderDone && (
        <Suspense fallback={null}>
          <Await resolve={data} errorElement={<p>Failed to load data</p>}>
            {() => <h1>Landing: {lang}</h1>}
          </Await>
        </Suspense>
      )}
    </Background>
  )
}

export default LandingPage
