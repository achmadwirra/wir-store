import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { AdminClient } from './admin-client'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id || session.user.role !== 'ADMIN') {
    redirect('/')
  }

  const [
    products,
    orders,
    users,
    totalRevenue,
    productCount,
    orderCount,
    userCount,
  ] = await Promise.all([
    prisma.product.findMany({
      include: { category: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
      take: 20,
    }),
    prisma.order.findMany({
      include: {
        user: { select: { name: true, email: true } },
        items: { include: { product: { select: { name: true } } } },
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
    }),
    prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, createdAt: true, _count: { select: { orders: true } } },
      orderBy: { createdAt: 'desc' },
      take: 20,
    }),
    prisma.order.aggregate({
      where: { status: { not: 'CANCELLED' } },
      _sum: { total: true },
    }),
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count(),
  ])

  return (
    <AdminClient
      products={JSON.parse(JSON.stringify(products))}
      orders={JSON.parse(JSON.stringify(orders))}
      users={JSON.parse(JSON.stringify(users))}
      stats={{
        totalRevenue: totalRevenue._sum.total || 0,
        productCount,
        orderCount,
        userCount,
      }}
    />
  )
}
