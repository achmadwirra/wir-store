'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 overflow-x-auto text-sm no-scrollbar sm:mb-8">
      <Link
        href="/"
        className="flex shrink-0 items-center gap-1 text-gray-400 transition-colors hover:text-white"
      >
        <Home size={14} />
        <span className="hidden sm:inline">Home</span>
      </Link>

      {items.map((item, index) => (
        <span key={index} className="flex shrink-0 items-center gap-1.5">
          <ChevronRight size={14} className="text-gray-600" />
          {item.href ? (
            <Link
              href={item.href}
              className="max-w-[120px] truncate text-gray-400 transition-colors hover:text-white sm:max-w-none"
            >
              {item.label}
            </Link>
          ) : (
            <span className="max-w-[150px] truncate text-gray-300 sm:max-w-none">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  )
}
