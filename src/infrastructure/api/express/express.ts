import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../customer/repository/sequelize/customer.model";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";
import { NewCustomerRouter } from "./routes/customer";

export async function NewExpress(): Promise<Express> {
    const app: Express = express();
    app.use(express.json());

    const customerRepository = new CustomerRepository()
    const customerRouter = NewCustomerRouter(customerRepository)

    app.use('/customer', customerRouter)

    return app
}

export async function NewSequelize(): Promise<Sequelize> {
    const sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false
    })

    sequelize.addModels([CustomerModel])

    await sequelize.sync();

    return sequelize
}