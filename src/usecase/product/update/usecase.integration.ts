import { Sequelize } from "sequelize-typescript"
import Product from "../../../domain/product/entity/product"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import { UpdateProductInputDTO } from "./dto"
import UpdateProductUseCase from "./usecase"

describe('Update product usecase tests', () => {
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

    const productMocked = new Product('123', 'Product 1', 10)

    it('should update a product', async () => {
        const repository = new ProductRepository()        
        const usecase = new UpdateProductUseCase(repository)

        await repository.create(productMocked)

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