import Product from "../../../domain/product/entity/product"
import { UpdateProductInputDTO } from "./dto"
import UpdateProductUseCase from "./usecase"

const buildProductRepositoryMock = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn()
    }
}

describe('Update product usecase tests', () => {
    const productMocked = new Product('123', 'Product 1', 10)

    it('should update a product', async () => {
        const repository = buildProductRepositoryMock()
        const usecase = new UpdateProductUseCase(repository)

        productMocked.changeName('Product one')

        const input: UpdateProductInputDTO = {
            id: productMocked.ID,
            name: productMocked.Name,
            price: productMocked.Price
        }

        const output = await usecase.execute(input)

        expect(output).toEqual({
            id: productMocked.ID,
            name: productMocked.Name,
            price: productMocked.Price
        })
    })
})