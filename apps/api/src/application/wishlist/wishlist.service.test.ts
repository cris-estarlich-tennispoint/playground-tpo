import { describe, it, expect, vi, beforeEach } from 'vitest'
import { WishlistService } from './wishlist.service'
import { WishlistRepository } from '../../infrastructure/persistence/wishlist.repository'
import { ProductsRepository } from '../../infrastructure/persistence/products.repository'

vi.mock('../../infrastructure/persistence/wishlist.repository')
vi.mock('../../infrastructure/persistence/products.repository')

const mockProduct = {
  id: '1',
  name: 'Shoe',
  image: 'https://example.com/shoe.jpg',
  price: 20,
}

const mockWishlistItem = {
  productId: '1',
  product: mockProduct,
}

describe('WishlistService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('findAll', () => {
    it('returns all wishlist items from the repository', () => {
      vi.mocked(WishlistRepository.findAll).mockReturnValue([mockWishlistItem])

      const result = WishlistService.findAll()

      expect(WishlistRepository.findAll).toHaveBeenCalledOnce()
      expect(result).toEqual([mockWishlistItem])
    })

    it('returns an empty array when wishlist is empty', () => {
      vi.mocked(WishlistRepository.findAll).mockReturnValue([])

      const result = WishlistService.findAll()

      expect(result).toEqual([])
    })
  })

  describe('add', () => {
    it('adds a product to the wishlist and returns null on success', () => {
      vi.mocked(ProductsRepository.findById).mockReturnValue(mockProduct)
      vi.mocked(WishlistRepository.add).mockReturnValue(undefined)

      const result = WishlistService.add('1')

      expect(ProductsRepository.findById).toHaveBeenCalledWith('1')
      expect(WishlistRepository.add).toHaveBeenCalledWith(mockProduct)
      expect(result).toBeNull()
    })

    it('returns an error when the product does not exist', () => {
      vi.mocked(ProductsRepository.findById).mockReturnValue(undefined)

      const result = WishlistService.add('unknown')

      expect(WishlistRepository.add).not.toHaveBeenCalled()
      expect(result).toEqual({ error: 'Product not found' })
    })
  })

  describe('remove', () => {
    it('delegates removal to the repository', () => {
      vi.mocked(WishlistRepository.remove).mockReturnValue(undefined)

      WishlistService.remove('1')

      expect(WishlistRepository.remove).toHaveBeenCalledWith('1')
    })
  })
})
