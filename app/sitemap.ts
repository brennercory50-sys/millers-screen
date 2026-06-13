import { MetadataRoute } from 'next'
import { getAllBlogSlugs } from '@/lib/blog'

const baseUrl = 'https://millersscreen.com'

const staticPages = [
  '',
  '/about',
  '/pool-enclosures',
  '/screen-rooms',
  '/rescreen',
  '/repair',
  '/megaview',
  '/concrete-pavers',
  '/showcase',
  '/financing',
  '/warranty',
  '/contact',
  '/blog',
  '/jobs',
  '/privacy',
]

const CITIES = ['daytona-beach', 'port-orange', 'ormond-beach', 'new-smyrna-beach', 'deland', 'deltona', 'south-daytona']
const SERVICES = ['pool-enclosures', 'screen-rooms', 'concrete-pavers']

const serviceAreas = CITIES.flatMap(city => SERVICES.map(service => `/${city}/${service}`))

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString()

  const staticPagesSitemap = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  const serviceAreaPages = serviceAreas.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const blogPostPages = getAllBlogSlugs().map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPagesSitemap, ...serviceAreaPages, ...blogPostPages]
}
