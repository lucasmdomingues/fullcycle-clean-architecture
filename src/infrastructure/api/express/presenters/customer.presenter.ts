import { toXML } from "jstoxml"
import { ListCustomerOutputDTO } from "../../../../usecase/customer/list/list.dto";

export default class CustomerPresenter {
    static toXML(data: ListCustomerOutputDTO): string {
        const options = {
            header: true,
            indent: " ",
            newline: "\n",
            allowEmpty: true,
        }

        return toXML({
            customers: {
                customer: data.customers.map(customer => ({
                    id: customer.id,
                    name: customer.name,
                    address: {
                        street: customer.address.street,
                        number: customer.address.number,
                        zip: customer.address.zip,
                        city: customer.address.city
                    }
                }))
            }
        }, options)
    }
}