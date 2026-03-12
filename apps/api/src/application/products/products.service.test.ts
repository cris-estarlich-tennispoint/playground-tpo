import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ProductsService } from './products.service'
import { ProductsRepository } from '../../infrastructure/persistence/products.repository'

vi.mock('../../infrastructure/persistence/products.repository')

const mockProduct = {
  id: '1',
  name: 'Shoe',
  image: 'https://example.com/shoe.jpg',
  price: 20,
}

describe('ProductsService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('findAll', () => {
    it('returns all products from the repository', () => {
      vi.mocked(ProductsRepository.findAll).mockReturnValue([mockProduct])

      const result = ProductsService.findAll()

      expect(ProductsRepository.findAll).toHaveBeenCalledOnce()
      expect(result).toEqual([mockProduct])
    })

    it('returns an empty array when no products exist', () => {
      vi.mocked(ProductsRepository.findAll).mockReturnValue([])

      const result = ProductsService.findAll()

      expect(result).toEqual([])
    })
  })

  describe('findById', () => {
    it('returns the product when it exists', () => {
      vi.mocked(ProductsRepository.findById).mockReturnValue(mockProduct)

      const result = ProductsService.findById('1')

      expect(ProductsRepository.findById).toHaveBeenCalledWith('1')
      expect(result).toEqual(mockProduct)
    })

    it('returns undefined when the product does not exist', () => {
      vi.mocked(ProductsRepository.findById).mockReturnValue(undefined)

      const result = ProductsService.findById('unknown')

      expect(result).toBeUndefined()
    })
  })
})
