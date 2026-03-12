import { Hono } from 'hono'
import { ProductsService } from '../application/products/products.service'

export const productsController = new Hono()
  .get('/', (c) => c.json(ProductsService.findAll()))
  .get('/:id', (c) => {
    const product = ProductsService.findById(c.req.param('id'))
    if (!product) return c.json({ error: 'Product not found' }, 404)
    return c.json(product)
  })
