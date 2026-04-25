import { prisma } from '@/lib/prisma'
import { HeroSection } from '@/components/home/hero-section'
import { CategoriesSection } from '@/components/home/categories-section'
import { FeaturedProducts } from '@/components/home/featured-products'
import { NewArrivals } from '@/components/home/new-arrivals'
import { TrustBadges } from '@/components/home/trust-badges'
import { NewsletterSection } from '@/components/home/newsletter-section'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [categories, featuredProducts, newArrivals] = await Promise.all([
    prisma.category.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: { name: 'asc' },
    }),
    prisma.product.findMany({
      where: { featured: true },
      include: { category: { select: { id: true, name: true, slug: true } } },
      take: 8,
      orderBy: { rating: 'desc' },
    }),
    prisma.product.findMany({
      include: { category: { select: { id: true, name: true, slug: true } } },
      take: 8,
      orderBy: { createdAt: 'desc' },
    }),
  ])

  return (
    <div className="space-y-20">
      <HeroSection />
      <TrustBadges />
      <CategoriesSection categories={categories} />
      <FeaturedProducts products={featuredProducts} />
      <NewArrivals products={newArrivals} />
      <NewsletterSection />
    </div>
  )
}
