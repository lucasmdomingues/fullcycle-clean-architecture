import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { UpdateCustomerInputDTO } from "./update.dto";
import UpdateCustomerUseCase from "./update.usecase";

const customer = CustomerFactory.createWithAddress('John', new Address(
    'Street', 1, "123", 'City'
))

const input: UpdateCustomerInputDTO = {
    id: customer.Id,
    name: customer.Name,
    address: {
        street: customer.Address.Street,
        number: customer.Address.Number,
        city: customer.Address.City,
        zip: customer.Address.Zipcode
    }
}

const buildCustomerRepositoryMock = (): CustomerRepositoryInterface => {
    return {
        create: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        update: jest.fn()
    }
}

describe('Unit test for customer update use case', () => {
    it('should update a customer', async () => {
        const repository = buildCustomerRepositoryMock()
        const usecase = new UpdateCustomerUseCase(repository)

        const output = await usecase.execute(input)

        expect(output).toEqual(input)
    })
})