import { ProductsRepository } from '../../infrastructure/persistence/products.repository'

export const ProductsService = {
  findAll: () => ProductsRepository.findAll(),
  findById: (id: string) => ProductsRepository.findById(id),
}
