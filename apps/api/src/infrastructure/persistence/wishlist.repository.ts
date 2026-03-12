import type { Product } from '../../domain/products/product.entity'
import type { WishlistItem } from '../../domain/wishlist/wishlist-item.entity'

const wishlist: WishlistItem[] = []

export const WishlistRepository = {
  findAll: (): WishlistItem[] => wishlist,
  add: (product: Product): void => {
    const exists = wishlist.some(item => item.productId === product.id)
    if (!exists) wishlist.push({ productId: product.id, product })
  },
  remove: (productId: string): void => {
    const index = wishlist.findIndex(item => item.productId === productId)
    if (index !== -1) wishlist.splice(index, 1)
  },
}
