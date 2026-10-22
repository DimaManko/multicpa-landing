import { createBrowserRouter, redirect } from 'react-router'

import LandingPage from '@/pages/landing'
import NotFoundPage from '@/pages/not-found'
import { isLocale } from '@/shared/config/locales'

export const router = createBrowserRouter([
  {
    path: '/:lang?',
    errorElement: <NotFoundPage />,
    element: <LandingPage />,
    loader: ({ params }) => {
      if (params.lang === 'en') {
        throw redirect('/')
      }

      if (params.lang !== undefined && !isLocale(params.lang)) {
        throw new Response(null, { status: 404 })
      }

      return null
    },
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
