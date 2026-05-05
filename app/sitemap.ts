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
  '/privacy',
]

const serviceAreas = [
  '/daytona-beach/pool-enclosures',
  '/port-orange/pool-enclosures',
  '/ormond-beach/pool-enclosures',
  '/new-smyrna-beach/pool-enclosures',
  '/deland/pool-enclosures',
  '/deltona/pool-enclosures',
  '/south-daytona/pool-enclosures',
  '/daytona-beach/screen-rooms',
  '/port-orange/screen-rooms',
  '/ormond-beach/screen-rooms',
  '/new-smyrna-beach/screen-rooms',
  '/deland/screen-rooms',
  '/deltona/screen-rooms',
  '/south-daytona/screen-rooms',
]

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
