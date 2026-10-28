import { Suspense, useState } from 'react'
import { Await, useLoaderData } from 'react-router'

import { Background } from '@/widgets/background'
import { Benefits } from '@/widgets/benefits'
import { Preloader } from '@/widgets/preloader'

import type { loader } from './model/loader'
import { useIsPending } from './model/useIsPending'

const LandingPage = () => {
  const { data, lang } = useLoaderData<typeof loader>()
  const isLoading = useIsPending(data)
  const [isPreloaderDone, setIsPreloaderDone] = useState(false)

  return (
    <Background>
      <Preloader isLoading={isLoading} onFinish={() => setIsPreloaderDone(true)} />
      {isPreloaderDone && (
        <Suspense fallback={null}>
          <Await resolve={data} errorElement={<p>Failed to load data</p>}>
            {(resolved) => {
              const benefits = resolved[1]

              return (
                <Benefits
                  locale={lang}
                  title={benefits.title}
                  description={benefits.description}
                  benefits={benefits.benefits}
                />
              )
            }}
          </Await>
        </Suspense>
      )}
    </Background>
  )
}

export default LandingPage
