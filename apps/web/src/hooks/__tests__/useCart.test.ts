import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useCart } from '../useCart'
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

const mockCartResponse = [{ product: mockProduct }]

function mockFetch(data: unknown, ok = true) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok,
      json: () => Promise.resolve(data),
    })
  )
}

describe('useCart', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('loads cart from API on mount', async () => {
    mockFetch(mockCartResponse)

    const { result } = renderHook(() => useCart())

    await waitFor(() => {
      expect(result.current.productsInBasket).toHaveLength(1)
    })

    expect(result.current.productsInBasket[0]).toEqual(mockProduct)
  })

  it('starts with an empty basket before fetch resolves', () => {
    mockFetch(mockCartResponse)

    const { result } = renderHook(() => useCart())

    expect(result.current.productsInBasket).toEqual([])
  })

  it('adds a product to the basket', async () => {
    mockFetch([])

    const { result } = renderHook(() => useCart())
    await waitFor(() => expect(result.current.productsInBasket).toEqual([]))

    mockFetch({ ok: true })

    await act(async () => {
      await result.current.addToCart(mockProduct)
    })

    expect(result.current.productsInBasket).toContainEqual(mockProduct)
  })

  it('removes a product from the basket', async () => {
    mockFetch(mockCartResponse)

    const { result } = renderHook(() => useCart())
    await waitFor(() => expect(result.current.productsInBasket).toHaveLength(1))

    mockFetch({})

    await act(async () => {
      await result.current.removeFromCart(mockProduct.id)
    })

    expect(result.current.productsInBasket).toEqual([])
  })

  it('shows error toast when initial load fails', async () => {
    const { default: toast } = await import('react-hot-toast')
    mockFetch(null, false)

    renderHook(() => useCart())

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled()
    })
  })

  it('shows error toast when addToCart fails', async () => {
    const { default: toast } = await import('react-hot-toast')
    mockFetch([])

    const { result } = renderHook(() => useCart())
    await waitFor(() => expect(result.current.productsInBasket).toEqual([]))

    mockFetch(null, false)

    await act(async () => {
      await result.current.addToCart(mockProduct)
    })

    expect(toast.error).toHaveBeenCalled()
    expect(result.current.productsInBasket).toEqual([])
  })
})
