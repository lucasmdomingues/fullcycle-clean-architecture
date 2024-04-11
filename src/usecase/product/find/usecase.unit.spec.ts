import Product from "../../../domain/product/entity/product"
import { FindProductInputDTO } from "./dto"
import FindProductUseCase from "./usecase"

const buildProductRepositoryMock = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn()
    }
}

describe('Find product usecase tests', () => {
    const product = new Product('123', 'Product 1', 10)

    it('should find a product', async () => {
        const repository = buildProductRepositoryMock()
        repository.find.mockReturnValue(product)

        const usecase = new FindProductUseCase(repository)
        const input: FindProductInputDTO = {
            id: product.ID
        }

        const output = await usecase.execute(input)

        expect(output).toEqual({
            id: product.ID,
            name: product.Name,
            price: product.Price
        })
    })
})