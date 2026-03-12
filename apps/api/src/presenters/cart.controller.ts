import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { GetCartItemsContract, AddCartItemContract, RemoveCartItemContract } from '@repo/shared'
import type { GetCartItemsResponse, AddCartItemRequest, AddCartItemResponse, RemoveCartItemResponse } from '@repo/shared'
import { CartService } from '../application/cart/cart.service'

const AddCartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().positive().optional(),
}) satisfies z.ZodType<AddCartItemRequest>

export const cartController = new Hono()
  .get(GetCartItemsContract.route, (c) => c.json<GetCartItemsResponse>(CartService.findAll()))
  .post(AddCartItemContract.route, zValidator('json', AddCartItemSchema), (c) => {
    const { productId, quantity } = c.req.valid('json')
    const error = CartService.add(productId, quantity)
    if (error) return c.json(error, 404)
    return c.json<AddCartItemResponse>({})
  })
  .delete(RemoveCartItemContract.route, (c) => {
    CartService.remove(c.req.param('id'))
    return c.json<RemoveCartItemResponse>({})
  })
