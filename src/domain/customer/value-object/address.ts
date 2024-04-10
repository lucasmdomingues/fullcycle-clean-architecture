class Address {
    street: string;
    number: number;
    city: string;
    zipcode: string;

    constructor(street: string, number: number, zipcode: string, city: string,) {
        this.street = street
        this.number = number
        this.city = city
        this.zipcode = zipcode
        this.validate()
    }

    get Street(): string {
        return this.street
    }
    get Number(): number {
        return this.number
    }
    get City(): string {
        return this.city
    }
    get Zipcode(): string {
        return this.zipcode
    }

    validate() {
        if (this.street.length == 0) {
            throw new Error("address street cannot be empty");
        }
        if (this.number <= 0) {
            throw new Error("address number cannot be empty");
        }
        if (this.city.length == 0) {
            throw new Error("address city cannot be empty");
        }
        if (this.zipcode.length == 0) {
            throw new Error("address zipcode cannot be empty");
        }
    }

    toString(): string {
        return `${this.Street}, ${this.Number}, ${this.city}, ${this.Zipcode}`
    }
}

export default Address