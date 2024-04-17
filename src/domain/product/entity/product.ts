import Entity from "../../@shared/entity/entity.abstract"
import NotificationError from "../../@shared/notification/notification.error"
import ProductValidatorFactory from "../factory/product.validator.factory"
import ProductInterface from "./product.interface"

class Product extends Entity implements ProductInterface {
    private name: string
    private price: number

    constructor(id: string, name: string, price: number) {
        super()
        this.id = id
        this.name = name
        this.price = price
        this.validate();

        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors());
        }
    }

    get ID(): string {
        return this.id
    }

    get Name(): string {
        return this.name
    }

    get Price(): number {
        return this.price
    }

    validate(): void {
        ProductValidatorFactory.create().validate(this)
    }

    changeName(newName: string): void {
        this.name = newName
    }

    changePrice(newPrice: number) {
        this.price = newPrice
    }
}

export default Product;