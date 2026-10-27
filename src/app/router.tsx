import { createBrowserRouter } from 'react-router'

import LandingPage, { loader } from '@/pages/landing'
import NotFoundPage from '@/pages/not-found'

export const router = createBrowserRouter([
  {
    path: '/:lang?',
    errorElement: <NotFoundPage />,
    element: <LandingPage />,
    loader,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
