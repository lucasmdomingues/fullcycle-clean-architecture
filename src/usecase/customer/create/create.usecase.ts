import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { CreateCustomerInputDTO, CreateCustomerOutputDTO } from "./create.dto";

export default class CreateCustomerUseCase {
    private repository: CustomerRepositoryInterface;

    constructor(repository: CustomerRepositoryInterface) {
        this.repository = repository
    }

    async execute(input: CreateCustomerInputDTO): Promise<CreateCustomerOutputDTO> {
        const address = new Address(input.address.street, input.address.number, input.address.zip, input.address.city)
        const customer = CustomerFactory.createWithAddress(input.name, address)

        await this.repository.create(customer)

        return {
            id: customer.Id,
            name: customer.Name,
            address: {
                street: customer.Address.Street,
                number: customer.Address.Number,
                zip: customer.Address.Zipcode,
                city: customer.Address.City,
            },
        }
    }
}