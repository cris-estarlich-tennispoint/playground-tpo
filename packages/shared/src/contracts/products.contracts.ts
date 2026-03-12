import type { Product } from '../index'

// GET /api/products
export const GetAllProductsContract = {
  route: '/products' as const,
  response: {} as Product[],
}
export type GetAllProductsResponse = Product[]

// GET /api/products/:id
export const GetProductByIdContract = {
  route: '/products/:id' as const,
  response: {} as Product,
}
export type GetProductByIdResponse = Product
