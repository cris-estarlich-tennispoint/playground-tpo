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

export const OrderItemSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive(),
  price: z.number().positive(),
})

export const OrderSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  total: z.number().positive(),
  createdAt: z.string(),
  items: z.array(OrderItemSchema),
})
export type Order = z.infer<typeof OrderSchema>
