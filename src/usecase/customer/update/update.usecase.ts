import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { UpdateCustomerInputDTO, UpdateCustomerOutputDTO } from "./update.dto";

export default class UpdateCustomerUseCase {
    private repository: CustomerRepositoryInterface;

    constructor(repository: CustomerRepositoryInterface) {
        this.repository = repository
    }

    async execute(input: UpdateCustomerInputDTO): Promise<UpdateCustomerOutputDTO> {
        const customer = await this.repository.find(input.id)
        customer.changeName(input.name)
        customer.changeAddress(new Address(input.address.street, input.address.number, input.address.zip, input.address.city))

        await this.repository.update(customer)

        return {
            id: customer.Id,
            name: customer.Name,
            address: {
                street: customer.Address.Street,
                number: customer.Address.Number,
                zip: customer.Address.Zipcode,
                city: customer.Address.City
            }
        }
    }
}