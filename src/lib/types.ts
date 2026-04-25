export interface CartItemType {
  id: string
  productId: string
  name: string
  price: number
  image: string
  quantity: number
  size?: string
  color?: string
  stock: number
}

export interface ShippingAddress {
  name: string
  street: string
  city: string
  state: string
  zip: string
  country: string
}

export interface ProductWithCategory {
  id: string
  name: string
  slug: string
  description: string
  price: number
  comparePrice: number | null
  images: string[]
  categoryId: string
  tags: string[]
  stock: number
  rating: number
  reviewCount: number
  featured: boolean
  sizes: string[]
  colors: string[]
  specifications: Record<string, string> | null
  createdAt: Date
  updatedAt: Date
  category: {
    id: string
    name: string
    slug: string
  }
}

export interface FilterState {
  category: string
  minPrice: number
  maxPrice: number
  rating: number
  sortBy: string
  search: string
  page: number
}
