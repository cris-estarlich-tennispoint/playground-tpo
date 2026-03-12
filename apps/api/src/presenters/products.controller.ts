import { Hono } from 'hono'
import { GetAllProductsContract, GetProductByIdContract } from '@repo/shared'
import type { GetAllProductsResponse, GetProductByIdResponse } from '@repo/shared'
import { ProductsService } from '../application/products/products.service'

export const productsController = new Hono()
  .get(GetAllProductsContract.route, (c) => c.json<GetAllProductsResponse>(ProductsService.findAll()))
  .get(GetProductByIdContract.route, (c) => {
    const product = ProductsService.findById(c.req.param('id'))
    if (!product) return c.json({ error: 'Product not found' }, 404)
    return c.json<GetProductByIdResponse>(product)
  })
