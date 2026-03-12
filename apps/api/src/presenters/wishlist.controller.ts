import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { GetWishlistItemsContract, AddWishlistItemContract, RemoveWishlistItemContract } from '@repo/shared'
import type { GetWishlistItemsResponse, AddWishlistItemRequest, AddWishlistItemResponse, RemoveWishlistItemResponse } from '@repo/shared'
import { WishlistService } from '../application/wishlist/wishlist.service'

const AddWishlistItemSchema = z.object({
  productId: z.string(),
}) satisfies z.ZodType<AddWishlistItemRequest>

export const wishlistController = new Hono()
  .get(GetWishlistItemsContract.route, (c) => c.json<GetWishlistItemsResponse>(WishlistService.findAll()))
  .post(AddWishlistItemContract.route, zValidator('json', AddWishlistItemSchema), (c) => {
    const { productId } = c.req.valid('json')
    const error = WishlistService.add(productId)
    if (error) return c.json(error, 404)
    return c.json<AddWishlistItemResponse>({})
  })
  .delete(RemoveWishlistItemContract.route, (c) => {
    WishlistService.remove(c.req.param('id'))
    return c.json<RemoveWishlistItemResponse>({})
  })
