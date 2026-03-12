import type { Product } from '@repo/shared'

export interface CartItem {
  productId: string
  quantity: number
  product: Product
}
