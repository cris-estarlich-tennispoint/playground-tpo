import type { WishlistItem } from '../index'

// GET /api/wishlist/products
export const GetWishlistItemsContract = {
  route: '/wishlist/products' as const,
  response: {} as WishlistItem[],
}
export type GetWishlistItemsResponse = WishlistItem[]

// POST /api/wishlist/product
export const AddWishlistItemContract = {
  route: '/wishlist/product' as const,
  requestBody: {} as AddWishlistItemRequest,
  response: {} as Record<string, never>,
}
export type AddWishlistItemRequest = {
  productId: string
}
export type AddWishlistItemResponse = Record<string, never>

// DELETE /api/wishlist/product/:id
export const RemoveWishlistItemContract = {
  route: '/wishlist/product/:id' as const,
  response: {} as Record<string, never>,
}
export type RemoveWishlistItemResponse = Record<string, never>
