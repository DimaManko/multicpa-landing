import type { ComponentType, SVGProps } from 'react'

import InstagramIcon from '@/shared/assets/icons/icon-instagram.svg?react'
import LinkedinIcon from '@/shared/assets/icons/icon-linkedin.svg?react'
import TelegramIcon from '@/shared/assets/icons/icon-telegram.svg?react'

export type SocialLink = {
  id: 'instagram' | 'telegram' | 'linkedin'
  href: string
  label: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { id: 'instagram', href: '#', label: 'Instagram', Icon: InstagramIcon },
  { id: 'telegram', href: '#', label: 'Telegram', Icon: TelegramIcon },
  { id: 'linkedin', href: '#', label: 'LinkedIn', Icon: LinkedinIcon },
]
