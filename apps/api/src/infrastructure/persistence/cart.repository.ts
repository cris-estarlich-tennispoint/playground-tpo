import type { Product } from '../../domain/products/product.entity'
import type { CartItem } from '../../domain/cart/cart-item.entity'

const cart: CartItem[] = []

export const CartRepository = {
  findAll: (): CartItem[] => cart,
  add: (product: Product, quantity = 1): void => {
    const existing = cart.find(item => item.productId === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      cart.push({ productId: product.id, quantity, product })
    }
  },
  remove: (productId: string): void => {
    const index = cart.findIndex(item => item.productId === productId)
    if (index !== -1) cart.splice(index, 1)
  },
}
