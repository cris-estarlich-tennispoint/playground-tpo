import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { WishlistService } from '../application/wishlist/wishlist.service'

const AddWishlistItemSchema = z.object({
  productId: z.string(),
})

export const wishlistController = new Hono()
  .get('/products', (c) => c.json(WishlistService.findAll()))
  .post('/product', zValidator('json', AddWishlistItemSchema), (c) => {
    const { productId } = c.req.valid('json')
    const error = WishlistService.add(productId)
    if (error) return c.json(error, 404)
    return c.json({})
  })
  .delete('/product/:id', (c) => {
    WishlistService.remove(c.req.param('id'))
    return c.json({})
  })
