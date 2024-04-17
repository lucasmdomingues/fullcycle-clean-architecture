import ProductFactory from "../../../domain/product/factory/product.factory"
import ListProductUseCase from "./usecase"

const buildProductRepositoryMock = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn()
    }
}

describe('List product usecase tests', () => {
    it('should list products', async () => {
        const productA = ProductFactory.create('a', 'Product 1', 10)
        const productB = ProductFactory.create('a', 'Product 1', 10)
        const products = [productA, productB]

        const repository = buildProductRepositoryMock()
        repository.findAll.mockReturnValue(products)

        const usecase = new ListProductUseCase(repository)
        const output = await usecase.execute({})

        output.products.forEach((product, i) => {
            expect(product.id).toBe(products[i].ID)
            expect(product.name).toBe(products[i].Name)
            expect(product.price).toBe(products[i].Price)
        })
    })
})