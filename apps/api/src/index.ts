import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { productsController } from './presenters/products.controller'
import { cartController } from './presenters/cart.controller'
import { wishlistController } from './presenters/wishlist.controller'

const app = new Hono().basePath('/api')

app.use('*', cors())
app.route('/', productsController)
app.route('/', cartController)
app.route('/', wishlistController)

export default { port: 3001, fetch: app.fetch }
