import { Suspense, useState } from 'react'
import { Await, useLoaderData } from 'react-router'

import { Background } from '@/widgets/background'
import { Preloader } from '@/widgets/preloader'

import type { loader } from './model/loader'
import { useIsPending } from './model/useIsPending'

import logo from '@/shared/assets/icons/logo.svg'
import { Header } from '@/widgets/header'
import { Hero } from '@/widgets/hero'

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
						{() => (
							<Hero
								header={<Header logo={<img src={logo} alt="MultiCPA" width={48} />} />}
							/>
						)}
					</Await>
				</Suspense>
			)}
		</Background>
	)
}

export default LandingPage
