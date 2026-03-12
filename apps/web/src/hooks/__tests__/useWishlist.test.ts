import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useWishlist } from '../useWishlist'
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

const mockWishlistResponse = [{ product: mockProduct }]

function mockFetch(data: unknown, ok = true) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok,
      json: () => Promise.resolve(data),
    })
  )
}

describe('useWishlist', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('loads wishlist from API on mount', async () => {
    mockFetch(mockWishlistResponse)

    const { result } = renderHook(() => useWishlist())

    await waitFor(() => {
      expect(result.current.productsInWishlist).toHaveLength(1)
    })

    expect(result.current.productsInWishlist[0]).toEqual(mockProduct)
  })

  it('starts with an empty wishlist before fetch resolves', () => {
    mockFetch(mockWishlistResponse)

    const { result } = renderHook(() => useWishlist())

    expect(result.current.productsInWishlist).toEqual([])
  })

  it('adds a product to the wishlist', async () => {
    mockFetch([])

    const { result } = renderHook(() => useWishlist())
    await waitFor(() => expect(result.current.productsInWishlist).toEqual([]))

    mockFetch({})

    await act(async () => {
      await result.current.addToWishlist(mockProduct)
    })

    expect(result.current.productsInWishlist).toContainEqual(mockProduct)
  })

  it('removes a product from the wishlist', async () => {
    mockFetch(mockWishlistResponse)

    const { result } = renderHook(() => useWishlist())
    await waitFor(() => expect(result.current.productsInWishlist).toHaveLength(1))

    mockFetch({})

    await act(async () => {
      await result.current.removeFromWishlist(mockProduct.id)
    })

    expect(result.current.productsInWishlist).toEqual([])
  })

  it('shows error toast when initial load fails', async () => {
    const { default: toast } = await import('react-hot-toast')
    mockFetch(null, false)

    renderHook(() => useWishlist())

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled()
    })
  })

  it('shows error toast when addToWishlist fails', async () => {
    const { default: toast } = await import('react-hot-toast')
    mockFetch([])

    const { result } = renderHook(() => useWishlist())
    await waitFor(() => expect(result.current.productsInWishlist).toEqual([]))

    mockFetch(null, false)

    await act(async () => {
      await result.current.addToWishlist(mockProduct)
    })

    expect(toast.error).toHaveBeenCalled()
    expect(result.current.productsInWishlist).toEqual([])
  })
})
