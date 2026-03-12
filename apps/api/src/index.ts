import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { productsController } from './presenters/products.controller'
import { cartController } from './presenters/cart.controller'
import { wishlistController } from './presenters/wishlist.controller'

const app = new Hono().basePath('/api')

app.use('*', cors())
app.route('/products', productsController)
app.route('/basket', cartController)
app.route('/wishlist', wishlistController)

export default { port: 3001, fetch: app.fetch }
