import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { CartService } from '../application/cart/cart.service'

const AddCartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().positive().optional(),
})

export const cartController = new Hono()
  .get('/products', (c) => c.json(CartService.findAll()))
  .post('/product', zValidator('json', AddCartItemSchema), (c) => {
    const { productId, quantity } = c.req.valid('json')
    const error = CartService.add(productId, quantity)
    if (error) return c.json(error, 404)
    return c.json({})
  })
  .delete('/product/:id', (c) => {
    CartService.remove(c.req.param('id'))
    return c.json({})
  })
