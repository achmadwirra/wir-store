import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || ''
    const category = searchParams.get('category') || ''
    const sort = searchParams.get('sort') || 'newest'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const random = searchParams.get('random') === 'true'

    const where: Record<string, unknown> = {}

    if (query) {
      where.OR = [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ]
    }

    if (category) {
      where.category = { slug: category }
    }

    // Random products for "You might also like" section
    if (random) {
      const totalCount = await prisma.product.count({ where })
      const skip = Math.max(0, Math.floor(Math.random() * (totalCount - limit)))
      const products = await prisma.product.findMany({
        where,
        include: { category: { select: { id: true, name: true, slug: true } } },
        skip,
        take: limit,
      })
      return NextResponse.json(products)
    }

    let orderBy: Record<string, string> = { createdAt: 'desc' }
    switch (sort) {
      case 'price-asc': orderBy = { price: 'asc' }; break
      case 'price-desc': orderBy = { price: 'desc' }; break
      case 'rating': orderBy = { rating: 'desc' }; break
      case 'popular': orderBy = { reviewCount: 'desc' }; break
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: { category: { select: { id: true, name: true, slug: true } } },
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({ where }),
    ])

    return NextResponse.json({
      products,
      total,
      pages: Math.ceil(total / limit),
      page,
    })
  } catch (error) {
    console.error('Products API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
