import { Laptop, Monitor, Smartphone, Tablet } from "lucide-react"

export const VIEWPORT_PRESETS = [
  { preset: 'desktop', label: 'Desktop',  width: 1440, height: 900,  icon: <Monitor size={14}/> },
  { preset: 'laptop',  label: 'Laptop',   width: 1280, height: 800,  icon: <Laptop size={14}/> },
  { preset: 'tablet',  label: 'Tablet',   width: 768,  height: 1024, icon: <Tablet size={15}/> },
  { preset: 'mobile',   label: 'Mobile',   width: 390,  height: 844,  icon: <Smartphone size={14}/> },
]

export const EXAMPLE_URLS = [
  { label: 'GitHub',  url: 'https://github.com' },
  { label: 'Apple',   url: 'https://apple.com' },
  { label: 'Stripe',  url: 'https://stripe.com' },
  { label: 'Linear',  url: 'https://linear.app' },
  { label: 'Vercel',  url: 'https://vercel.com' },
]
