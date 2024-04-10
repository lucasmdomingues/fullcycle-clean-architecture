import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.usecase";

const customer1 = CustomerFactory.createWithAddress(
    "John", new Address('Street', 1, "123", "123")
)

const customer2 = CustomerFactory.createWithAddress(
    "Jane", new Address('Street', 1, "123", "123")
)

const customersMock = [customer1, customer2]

const buildCustomerRepositoryMock = (): CustomerRepositoryInterface => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve(customersMock))
    }
}

describe('Unit test for listing customer usecase', () => {
    it('should list a customer', async () => {
        const repository = buildCustomerRepositoryMock()
        const usecase = new ListCustomerUseCase(repository)

        const output = await usecase.execute({})
        expect(output.customers.length).toBe(2)

        output.customers.forEach((customer, i) => {
            expect(customer.id).toBe(customersMock[i].Id)
            expect(customer.name).toBe(customersMock[i].Name)
            expect(customer.address.street).toBe(customersMock[i].Address.Street)
            expect(customer.address.number).toBe(customersMock[i].Address.Number)
            expect(customer.address.city).toBe(customersMock[i].Address.City)
            expect(customer.address.zip).toBe(customersMock[i].Address.Zipcode)
        });
    })
})