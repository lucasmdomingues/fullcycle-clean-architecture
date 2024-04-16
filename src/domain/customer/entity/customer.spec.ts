import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "Test")
        }).toThrow("customer: id cannot be empty");
    })

    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("1", "")
        }).toThrow("customer: name cannot be empty");
    })

    it("should throw error when id and name is are empty", () => {
        expect(() => {
            let customer = new Customer("", "")
        }).toThrow("customer: id cannot be empty, customer: name cannot be empty");
    })

    it("should change name", () => {
        // Arrange
        const customer = new Customer("1", "foo");

        // Act
        customer.changeName("bar");

        // Assert
        expect(customer.Name).toBe("bar");
    })

    it("should activate customer", () => {
        const customer = new Customer("1", "foo");
        const address = new Address("Street 1", 1, "123", "City 1")

        customer.changeAddress(address)
        customer.activate();

        expect(customer.isActive()).toBe(true);
    })

    it("should deactivate customer", () => {
        const customer = new Customer("1", "foo");

        customer.deactivate();

        expect(customer.isActive()).toBe(false);
    })

    it("should throw error when address is empty", () => {
        expect(() => {
            const customer = new Customer("1", "foo");
            customer.activate();
        }).toThrow("address cannot be empty")
    })

    it("should add reward points", () => {
        const customer = new Customer("1", "Customer 1")
        expect(customer.RewardPoints).toBe(0)

        customer.addRewardPoints(10)
        expect(customer.RewardPoints).toBe(10)

        customer.addRewardPoints(10)
        expect(customer.RewardPoints).toBe(20)
    })
});