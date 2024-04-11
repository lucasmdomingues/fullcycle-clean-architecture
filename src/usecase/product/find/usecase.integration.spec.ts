import { Sequelize } from "sequelize-typescript"
import Product from "../../../domain/product/entity/product"
import { FindProductInputDTO } from "./dto"
import FindProductUseCase from "./usecase"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"

describe('Find product usecase tests', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {
                force: true,
            }
        })

        sequelize.addModels([ProductModel])
        await sequelize.sync()
    })


    afterEach(async () => {
        await sequelize.close()
    })

    const product = new Product('123', 'Product 1', 10)

    it('should find a product', async () => {
        const repository = new ProductRepository()

        await repository.create(product)

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