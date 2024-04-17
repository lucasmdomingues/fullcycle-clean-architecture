import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory"
import ListProductUseCase from "./usecase"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";

describe('List product usecase tests', () => {
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

    it('should list products', async () => {
        const productA = new Product('123', 'Product A', 10)
        const productB = new Product('456', 'Product B', 20)
        const products = [productA, productB]

        const repository = new ProductRepository()
        await repository.create(productA)
        await repository.create(productB)

        const usecase = new ListProductUseCase(repository)
        const output = await usecase.execute({})

        output.products.forEach((product, i) => {
            expect(product.id).toBe(products[i].ID)
            expect(product.name).toBe(products[i].Name)
            expect(product.price).toBe(products[i].Price)
        })
    })
})