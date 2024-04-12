import express, { Request, Response } from 'express'
import CreateCustomerUseCase from '../../../../usecase/customer/create/create.usecase'
import CustomerRepository from '../../../customer/repository/sequelize/customer.repository'

export function NewCustomerRouter(repository: CustomerRepository): express.IRouter {
    const router = express.Router()

    router.post("/", async (req: Request, res: Response) => {
        const usecase = new CreateCustomerUseCase(repository)

        try {
            const dto = {
                name: req.body.name,
                address: {
                    street: req.body.address.street,
                    city: req.body.address.city,
                    number: req.body.address.number,
                    zip: req.body.address.zip
                }
            }

            const output = await usecase.execute(dto)

            res.send(output)
        } catch (error) {
            res.status(500).send(error)
        }
    })

    return router
}