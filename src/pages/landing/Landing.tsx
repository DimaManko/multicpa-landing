import { useLoaderData } from 'react-router'
import { Button } from '@/shared/ui/button'

import type { Locale } from '@/shared/config/locales'


const LandingPage = () => {
  const { lang } = useLoaderData() as { lang: Locale }
  return (
		<>
			<h1>Landing: {lang}</h1>
			<Button>OOPS, TAKE ME BACK</Button>
		</>
      
  )
}

export default LandingPage
