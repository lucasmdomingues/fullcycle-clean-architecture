import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../customer/repository/sequelize/customer.model";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";
import { NewCustomerRouter } from "./routes/customer";
import ProductModel from "../../product/repository/sequelize/product.model";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import { NewProductRouter } from "./routes/product";

export async function NewExpress(): Promise<Express> {
    const app: Express = express();
    app.use(express.json());

    const customerRepository = new CustomerRepository()
    const customerRouter = NewCustomerRouter(customerRepository)

    const productRepository = new ProductRepository()
    const productRouter = NewProductRouter(productRepository)

    app.use('/customers', customerRouter)
    app.use('/products', productRouter)

    return app
}

export async function NewSequelize(): Promise<Sequelize> {
    const sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false
    })

    sequelize.addModels([CustomerModel, ProductModel])

    await sequelize.sync();

    return sequelize
}