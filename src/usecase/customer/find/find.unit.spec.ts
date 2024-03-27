import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import { FindCustomerInputDTO, FindCustomerOutputDTO } from "./find.dto";
import FindCustomerUseCase from "./find.usecase";

const buildCustomerRepositoryMock = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe('Test find customer use case', () => {
    it("should find a customer", async () => {
        const address = new Address("Street", 123, "123", "City")
        const customer = new Customer("123", "John")
        customer.changeAddress(address)

        const customerRepository = buildCustomerRepositoryMock()
        customerRepository.find.mockReturnValue(Promise.resolve(customer))

        const input: FindCustomerInputDTO = { id: "123" }

        const usecase = new FindCustomerUseCase(customerRepository)
        const output = await usecase.execute(input)

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

    it("should not find a customer", async () => {
        const customerRepository = buildCustomerRepositoryMock()
        customerRepository.find.mockImplementation(() => {
            throw new Error("Customer not found");
        })

        const usecase = new FindCustomerUseCase(customerRepository)

        const input = {
            id: "123"
        }

        expect(() => { return usecase.execute(input) }).rejects.toThrow("Customer not found")
    })
});