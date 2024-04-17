import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import CustomerValidatorFactory from "../factory/customer.validator.factory";
import Address from "../value-object/address";

export default class Customer extends Entity {
    private name: string;
    private address!: Address;
    private active: boolean = false;
    private rewardPoints: number = 0;

    constructor(id: string, name: string) {
        super();
        this.id = id;
        this.name = name;
        this.validate();

        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors())
        }
    }

    get Name(): string {
        return this.name
    }

    get RewardPoints(): number {
        return this.rewardPoints
    }

    get Address(): Address {
        return this.address
    }

    validate() {
        CustomerValidatorFactory.create().validate(this)
    }

    activate() {
        if (this.address == undefined) {
            throw new Error("address cannot be empty");
        }
        this.active = true;
    }

    deactivate() {
        this.active = false;
    }

    changeName(name: string): void {
        this.name = name;
    }

    isActive(): boolean {
        return this.active
    }

    addRewardPoints(points: number) {
        this.rewardPoints += points
    }

    changeAddress(address: Address) {
        this.address = address
    }
}