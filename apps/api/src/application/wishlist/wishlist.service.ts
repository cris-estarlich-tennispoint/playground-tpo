import { WishlistRepository } from '../../infrastructure/persistence/wishlist.repository'
import { ProductsRepository } from '../../infrastructure/persistence/products.repository'

export const WishlistService = {
  findAll: () => WishlistRepository.findAll(),

  add: (productId: string): { error: string } | null => {
    const product = ProductsRepository.findById(productId)
    if (!product) return { error: 'Product not found' }
    WishlistRepository.add(product)
    return null
  },

  remove: (productId: string): void => WishlistRepository.remove(productId),
}
