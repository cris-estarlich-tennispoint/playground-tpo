import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductTile from '../Product'
import type { ProductType } from '../../types/ProductType'

vi.mock('react-hot-toast', () => ({
  default: { success: vi.fn(), error: vi.fn() },
}))

const mockProduct: ProductType = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  name: 'Test Shoes',
  price: 49.99,
  image: 'https://example.com/shoes.jpg',
  discount: undefined,
}

const mockProductWithDiscount: ProductType = {
  ...mockProduct,
  discount: 20,
}

describe('ProductTile', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('full card mode', () => {
    it('renders product name and price', () => {
      render(<ProductTile product={mockProduct} />)

      expect(screen.getByText('Test Shoes')).toBeInTheDocument()
      expect(screen.getByText('$49.99')).toBeInTheDocument()
    })

    it('renders product image with alt text', () => {
      render(<ProductTile product={mockProduct} />)

      const img = screen.getByRole('img', { name: 'Test Shoes' })
      expect(img).toBeInTheDocument()
    })

    it('shows discount badge when discount is present', () => {
      render(<ProductTile product={mockProductWithDiscount} />)

      expect(screen.getByText('20% OFF')).toBeInTheDocument()
    })

    it('does not show discount badge when discount is absent', () => {
      render(<ProductTile product={mockProduct} />)

      expect(screen.queryByText(/% OFF/)).not.toBeInTheDocument()
    })

    it('calls addToCart when the add button is clicked', async () => {
      const addToCart = vi.fn()
      render(<ProductTile product={mockProduct} addToCart={addToCart} />)

      await userEvent.click(screen.getByRole('button', { name: /add to cart/i }))

      expect(addToCart).toHaveBeenCalledOnce()
    })

    it('calls addToWishlist and shows toast when heart button is clicked', async () => {
      const { default: toast } = await import('react-hot-toast')
      const addToWishlist = vi.fn()
      render(<ProductTile product={mockProduct} addToWishlist={addToWishlist} />)

      await userEvent.click(screen.getByRole('button'))

      expect(addToWishlist).toHaveBeenCalledWith(mockProduct)
      expect(toast.success).toHaveBeenCalled()
    })

    it('does not show wishlist button when product is already in wishlist', () => {
      render(<ProductTile product={mockProduct} addToWishlist={vi.fn()} isInWishlist />)

      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('calls onRemove when remove button is clicked (no addToCart)', async () => {
      const onRemove = vi.fn()
      render(<ProductTile product={mockProduct} onRemove={onRemove} />)

      await userEvent.click(screen.getByRole('button', { name: /remove/i }))

      expect(onRemove).toHaveBeenCalledOnce()
    })
  })

  describe('compact mode', () => {
    it('renders product name and price in compact layout', () => {
      render(<ProductTile product={mockProduct} compact />)

      expect(screen.getByText('Test Shoes')).toBeInTheDocument()
      expect(screen.getByText('$49.99')).toBeInTheDocument()
    })

    it('calls onRemove when trash button is clicked in compact mode', async () => {
      const onRemove = vi.fn()
      render(<ProductTile product={mockProduct} compact onRemove={onRemove} />)

      await userEvent.click(screen.getByRole('button'))

      expect(onRemove).toHaveBeenCalledOnce()
    })

    it('does not show remove button in compact mode when onRemove is absent', () => {
      render(<ProductTile product={mockProduct} compact />)

      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })
  })
})
