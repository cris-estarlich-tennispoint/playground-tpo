import { describe, it, expect, vi, beforeEach } from 'vitest'
import { CartService } from './cart.service'
import { CartRepository } from '../../infrastructure/persistence/cart.repository'
import { ProductsRepository } from '../../infrastructure/persistence/products.repository'

vi.mock('../../infrastructure/persistence/cart.repository')
vi.mock('../../infrastructure/persistence/products.repository')

const mockProduct = {
  id: '1',
  name: 'Shoe',
  image: 'https://example.com/shoe.jpg',
  price: 20,
}

const mockCartItem = {
  productId: '1',
  quantity: 2,
  product: mockProduct,
}

describe('CartService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('findAll', () => {
    it('returns all cart items from the repository', () => {
      vi.mocked(CartRepository.findAll).mockReturnValue([mockCartItem])

      const result = CartService.findAll()

      expect(CartRepository.findAll).toHaveBeenCalledOnce()
      expect(result).toEqual([mockCartItem])
    })

    it('returns an empty array when cart is empty', () => {
      vi.mocked(CartRepository.findAll).mockReturnValue([])

      const result = CartService.findAll()

      expect(result).toEqual([])
    })
  })

  describe('add', () => {
    it('adds a product to the cart and returns null on success', () => {
      vi.mocked(ProductsRepository.findById).mockReturnValue(mockProduct)
      vi.mocked(CartRepository.add).mockReturnValue(undefined)

      const result = CartService.add('1', 1)

      expect(ProductsRepository.findById).toHaveBeenCalledWith('1')
      expect(CartRepository.add).toHaveBeenCalledWith(mockProduct, 1)
      expect(result).toBeNull()
    })

    it('uses quantity 1 as default', () => {
      vi.mocked(ProductsRepository.findById).mockReturnValue(mockProduct)
      vi.mocked(CartRepository.add).mockReturnValue(undefined)

      CartService.add('1')

      expect(CartRepository.add).toHaveBeenCalledWith(mockProduct, 1)
    })

    it('returns an error when the product does not exist', () => {
      vi.mocked(ProductsRepository.findById).mockReturnValue(undefined)

      const result = CartService.add('unknown')

      expect(CartRepository.add).not.toHaveBeenCalled()
      expect(result).toEqual({ error: 'Product not found' })
    })
  })

  describe('remove', () => {
    it('delegates removal to the repository', () => {
      vi.mocked(CartRepository.remove).mockReturnValue(undefined)

      CartService.remove('1')

      expect(CartRepository.remove).toHaveBeenCalledWith('1')
    })
  })
})
