import { prisma } from '@/lib/prisma'
import { ProductsClient } from './products-client'

export const dynamic = 'force-dynamic'

interface Props {
  searchParams: Promise<{
    category?: string
    search?: string
    sort?: string
    minPrice?: string
    maxPrice?: string
    rating?: string
    page?: string
    featured?: string
  }>
}

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams
  const page = parseInt(params.page || '1')
  const perPage = 12

  const where: Record<string, unknown> = {}

  if (params.category) {
    where.category = { slug: params.category }
  }

  if (params.search) {
    where.OR = [
      { name: { contains: params.search, mode: 'insensitive' } },
      { description: { contains: params.search, mode: 'insensitive' } },
      { tags: { has: params.search.toLowerCase() } },
    ]
  }

  if (params.minPrice || params.maxPrice) {
    where.price = {}
    if (params.minPrice) (where.price as Record<string, number>).gte = parseFloat(params.minPrice)
    if (params.maxPrice) (where.price as Record<string, number>).lte = parseFloat(params.maxPrice)
  }

  if (params.rating) {
    where.rating = { gte: parseFloat(params.rating) }
  }

  if (params.featured === 'true') {
    where.featured = true
  }

  let orderBy: Record<string, string> = { createdAt: 'desc' }
  switch (params.sort) {
    case 'price-asc':
      orderBy = { price: 'asc' }
      break
    case 'price-desc':
      orderBy = { price: 'desc' }
      break
    case 'rating':
      orderBy = { rating: 'desc' }
      break
    case 'newest':
      orderBy = { createdAt: 'desc' }
      break
    case 'popular':
      orderBy = { reviewCount: 'desc' }
      break
  }

  const [products, totalCount, categories] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: { select: { id: true, name: true, slug: true } } },
      orderBy,
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.product.count({ where }),
    prisma.category.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: { name: 'asc' },
    }),
  ])

  const totalPages = Math.ceil(totalCount / perPage)

  return (
    <ProductsClient
      products={JSON.parse(JSON.stringify(products))}
      categories={JSON.parse(JSON.stringify(categories))}
      totalCount={totalCount}
      totalPages={totalPages}
      currentPage={page}
      filters={{
        category: params.category || '',
        search: params.search || '',
        sort: params.sort || 'newest',
        minPrice: params.minPrice || '',
        maxPrice: params.maxPrice || '',
        rating: params.rating || '',
        featured: params.featured || '',
      }}
    />
  )
}
