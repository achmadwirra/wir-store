import { prisma } from '@/lib/prisma'
import { SearchClient } from './search-client'

export const dynamic = 'force-dynamic'

interface Props {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams
  const query = params.q || ''

  let products: Array<{
    id: string
    name: string
    slug: string
    price: number
    comparePrice: number | null
    images: string[]
    rating: number
    reviewCount: number
    stock: number
    colors: string[]
    category: { id: string; name: string; slug: string }
  }> = []

  if (query) {
    products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { tags: { has: query.toLowerCase() } },
        ],
      },
      include: { category: { select: { id: true, name: true, slug: true } } },
      take: 20,
    })
  }

  return <SearchClient initialQuery={query} initialResults={JSON.parse(JSON.stringify(products))} />
}
