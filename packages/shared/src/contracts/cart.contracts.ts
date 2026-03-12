import type { CartItem } from '../index'

// GET /api/basket/products
export const GetCartItemsContract = {
  route: '/basket/products' as const,
  response: {} as CartItem[],
}
export type GetCartItemsResponse = CartItem[]

// POST /api/basket/product
export const AddCartItemContract = {
  route: '/basket/product' as const,
  requestBody: {} as AddCartItemRequest,
  response: {} as Record<string, never>,
}
export type AddCartItemRequest = {
  productId: string
  quantity?: number
}
export type AddCartItemResponse = Record<string, never>

// DELETE /api/basket/product/:id
export const RemoveCartItemContract = {
  route: '/basket/product/:id' as const,
  response: {} as Record<string, never>,
}
export type RemoveCartItemResponse = Record<string, never>
