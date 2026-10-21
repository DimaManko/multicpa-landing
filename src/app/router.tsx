import { createBrowserRouter, redirect } from 'react-router'

import LandingPage from '@/pages/landing'
import NotFoundPage from '@/pages/not-found'
import { getBenefits, getMultiply, getTasks } from '@/shared/api'
import { rememberLocale } from '@/shared/config/home-path'
import { isLocale } from '@/shared/config/locales'

export const router = createBrowserRouter([
  {
    path: '/:lang?',
    errorElement: <NotFoundPage />,
    element: <LandingPage />,
    loader: async ({ params }) => {
      if (params.lang === 'en') {
        throw redirect('/')
      }

      const lang = params.lang ?? 'en'

      if (!isLocale(lang)) {
        throw new Response(null, { status: 404 })
      }

      rememberLocale(lang)

      const [tasks, benefits, multiply] = await Promise.all([
        getTasks(lang),
        getBenefits(lang),
        getMultiply(lang),
      ])

      return { tasks, benefits, multiply, lang }
    },
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
