import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import { FindCustomerInputDTO, FindCustomerOutputDTO } from "./find.dto";
import FindCustomerUseCase from "./find.usecase";

describe('Test find customer use case', () => {
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

        sequelize.addModels([CustomerModel])
        await sequelize.sync()
    })


    afterEach(async () => {
        await sequelize.close()
    })

    it("should find a customer", async () => {
        const address = new Address("Street", 123, "123", "City")
        const customer = new Customer("123", "John")
        customer.changeAddress(address)

        const customerRepository = new CustomerRepository();
        await customerRepository.create(customer)

        const input: FindCustomerInputDTO = {
            id: "123"
        }

        const usecase = new FindCustomerUseCase(customerRepository)
        const output = usecase.execute(input)

        const expected: FindCustomerOutputDTO = {
            id: "123",
            name: "John",
            address: {
                street: "Street",
                city: "City",
                number: 123,
                zipcode: "123"
            }
        }

        expect(output).toEqual(expected);
    })
});