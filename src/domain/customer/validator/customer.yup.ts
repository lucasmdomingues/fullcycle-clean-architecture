import ValidatorInterface from "../../@shared/validator/validator.interface";
import Customer from "../entity/customer";
import * as yup from "yup"

export default class CustomerYupValidator implements ValidatorInterface<Customer> {
    validate(entity: Customer): void {
        try {
            yup.object().shape({
                id: yup.string().required("id cannot be empty"),
                name: yup.string().required("name cannot be empty")
            }).validateSync({
                id: entity.Id,
                name: entity.Name
            }, {
                abortEarly: false
            })
        } catch (error) {
            const validationErr = error as yup.ValidationError
            
            validationErr.errors.forEach(err => {
                entity.Notification.addError({
                    context: 'customer',
                    message: err
                })
            })
        }
    }
}