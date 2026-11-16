import { Suspense, useRef, useState } from 'react'
import { Await, useLoaderData } from 'react-router'

import { Background } from '@/widgets/background'
import { Benefits } from '@/widgets/benefits'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'
import { Hero } from '@/widgets/hero'
import { Multiply } from '@/widgets/multiply'
import { Preloader } from '@/widgets/preloader'
import type { SnapScrollHandle } from '@/features/snap-scroll'
import { SnapScroll } from '@/features/snap-scroll'
import logo from '@/shared/assets/icons/logo.svg'

import type { loader } from './model/loader'
import { useIsPending } from './model/useIsPending'

const LandingPage = () => {
	const { data, lang } = useLoaderData<typeof loader>()
	const isLoading = useIsPending(data)
	const [isPreloaderDone, setIsPreloaderDone] = useState(false)
	const snapRef = useRef<SnapScrollHandle>(null)

	return (
		<Background>
			<Preloader isLoading={isLoading} onFinish={() => setIsPreloaderDone(true)} />
			{isPreloaderDone && (
				<Suspense fallback={null}>
					<Await resolve={data} errorElement={<p>Failed to load data</p>}>
						{([, benefits, multiply]) => {
							return (
								<SnapScroll
									ref={snapRef}
									sections={[
										{
											id: 'hero',
											content: (
												<Hero
													header={<Header logo={<img src={logo} alt="MultiCPA" width={48} />} />}
												/>
											),
										},
										{
											id: 'benefits',
											content: (
												<Benefits
													locale={lang}
													title={benefits.title}
													description={benefits.description}
													benefits={benefits.benefits}
												/>
											),
										},
										{
											id: 'multiply',
											content: (
												<Multiply
													items={multiply}
													footer={<Footer onScrollTop={() => snapRef.current?.goTo(0)} />}
												/>
											),
										},
									]}
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