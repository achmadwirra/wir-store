import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { AccountClient } from './account-client'

export const dynamic = 'force-dynamic'

export default async function AccountPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect('/auth/signin')
  }

  const [orders, addresses, wishlist] = await Promise.all([
    prisma.order.findMany({
      where: { userId: session.user.id },
      include: {
        items: {
          include: { product: { select: { name: true, images: true, slug: true } } },
        },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.address.findMany({
      where: { userId: session.user.id },
    }),
    prisma.wishlist.findMany({
      where: { userId: session.user.id },
      include: {
        product: {
          include: { category: { select: { id: true, name: true, slug: true } } },
        },
      },
    }),
  ])

  return (
    <AccountClient
      user={session.user}
      orders={JSON.parse(JSON.stringify(orders))}
      addresses={JSON.parse(JSON.stringify(addresses))}
      wishlist={JSON.parse(JSON.stringify(wishlist))}
    />
  )
}
