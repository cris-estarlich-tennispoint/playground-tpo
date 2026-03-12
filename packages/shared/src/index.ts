import { z } from 'zod'

export const ProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  image: z.string().url(),
  price: z.number().positive(),
  discount: z.number().optional(),
})
export type Product = z.infer<typeof ProductSchema>

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string(),
})
export type User = z.infer<typeof UserSchema>

export const CartItemSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive(),
  product: ProductSchema,
})
export type CartItem = z.infer<typeof CartItemSchema>

export const WishlistItemSchema = z.object({
  productId: z.string().uuid(),
  product: ProductSchema,
})
export type WishlistItem = z.infer<typeof WishlistItemSchema>

export * from './contracts/products.contracts'
export * from './contracts/cart.contracts'
export * from './contracts/wishlist.contracts'
