import CreateCustomerUseCase from "./create.usecase"

const input = {
    name: 'John',
    address: {
        city: 'My scity',
        number: 1,
        street: 'My street',
        zip: '213'
    }
}

const buildCustomerRepositoryMock = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe('Unit test create customer use case', () => {
    it('should create a customer', async () => {
        const repository = buildCustomerRepositoryMock()
        const usecase = new CreateCustomerUseCase(repository)

        const output = await usecase.execute(input)

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: input.address
        })
    })

    it('shoud thrown an error when name is missing', async () => {
        const repository = buildCustomerRepositoryMock()
        const usecase = new CreateCustomerUseCase(repository)

        input.name = ''

        await expect(usecase.execute(input)).rejects.toThrow("customer: name cannot be empty")
    })

    it('shoud thrown an error when address is missing', async () => {
        const repository = buildCustomerRepositoryMock()
        const usecase = new CreateCustomerUseCase(repository)

        input.address.street = ''
        input.address.number = 0
        input.address.city = ''
        input.address.zip = ''

        await expect(usecase.execute(input)).rejects.toThrow("address street cannot be empty")
    })
})