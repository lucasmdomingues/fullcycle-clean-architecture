import { ValidationError } from "yup";
import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../entity/product";
import * as yup from 'yup'

export default class ProductYupValidator implements ValidatorInterface<Product> {
    validate(entity: Product): void {
        try {
            yup.object().shape({
                id: yup.string().required("id cannot be empty"),
                name: yup.string().required("name cannot be empty"),
                price: yup.number().positive("price cannot be empty")
            }).validateSync({
                id: entity.Id,
                name: entity.Name,
                price: entity.Price
            }, {
                abortEarly: false
            })
        } catch (error) {
            const e = error as ValidationError

            e.errors.forEach(err => entity.Notification.addError({
                context: 'product', message: err
            }))
        }
    }
}