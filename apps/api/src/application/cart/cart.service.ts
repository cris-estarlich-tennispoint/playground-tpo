import { CartRepository } from '../../infrastructure/persistence/cart.repository'
import { ProductsRepository } from '../../infrastructure/persistence/products.repository'

export const CartService = {
  findAll: () => CartRepository.findAll(),

  add: (productId: string, quantity = 1): { error: string } | null => {
    const product = ProductsRepository.findById(productId)
    if (!product) return { error: 'Product not found' }
    CartRepository.add(product, quantity)
    return null
  },

  remove: (productId: string): void => CartRepository.remove(productId),
}
