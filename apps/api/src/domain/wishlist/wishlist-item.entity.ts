import type { Product } from '@repo/shared'

export interface WishlistItem {
  productId: string
  product: Product
}
