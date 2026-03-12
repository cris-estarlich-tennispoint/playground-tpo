import type { Product } from '../../domain/products/product.entity'

const products: Product[] = [
  { id: '1', name: 'Shoe', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', price: 20 },
  { id: '2', name: 'T-Shirt', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', price: 30 },
  { id: '3', name: 'Ball', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', price: 15 },
]

export const ProductsRepository = {
  findAll: (): Product[] => products,
  findById: (id: string): Product | undefined => products.find(p => p.id === id),
}
