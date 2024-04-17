import Product from "../../../domain/product/entity/product"
import { CreateProductInputDTO } from "./dto"
import CreateProductUseCase from "./usecase"

const buildProductRepositoryMock = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn()
    }
}

describe('Create product usecase unit tests', () => {
    const productMocked = new Product('123', 'Product 1', 10)
    
    it('should create a product', async () => {
        const repository = buildProductRepositoryMock()
        repository.create.mockReturnValue(productMocked)

        const input: CreateProductInputDTO = {
            id: productMocked.ID,
            name: productMocked.Name,
            price: productMocked.Price
        }

        const usecase = new CreateProductUseCase(repository)
        const output = await usecase.execute(input)

        expect(output).toEqual({
            id: productMocked.ID,
            name: productMocked.Name,
            price: productMocked.Price
        })
    })

    it('should throw an error when product id is missing', async () => {
        const repository = buildProductRepositoryMock()
        const usecase = new CreateProductUseCase(repository)

        const input: CreateProductInputDTO = {
            id: '',
            name: productMocked.Name,
            price: productMocked.Price
        }

        await expect(() => usecase.execute(input)).rejects.toThrow('product: id cannot be empty')
    })
    
    it('should throw an error when product name is missing', async () => {
        const repository = buildProductRepositoryMock()
        const usecase = new CreateProductUseCase(repository)

        const input: CreateProductInputDTO = {
            id: productMocked.ID,
            name: "",
            price: productMocked.Price
        }

        await expect(() => usecase.execute(input)).rejects.toThrow('product: name cannot be empty')
    })
    
    it('should throw an error when product price is missing', async () => {
        const repository = buildProductRepositoryMock()
        const usecase = new CreateProductUseCase(repository)

        const input: CreateProductInputDTO = {
            id: productMocked.ID,
            name: productMocked.Name,
            price: -1
        }

        await expect(() => usecase.execute(input)).rejects.toThrow('product: price cannot be empty')
    })
})