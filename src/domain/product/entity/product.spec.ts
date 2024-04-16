import Product from "./product"

describe('Product unit tests', () => {
    it('should throw error when id is empty', () => {
        expect(() => {
            let product = new Product("", "Product 1", 100)
        }).toThrow("product: id cannot be empty")
    })
    
    it('should throw error when name is empty', () => {
        expect(() => {
            let product = new Product("1", "", 100)
        }).toThrow("product: name cannot be empty")
    })
    
    it('should throw error when price is empty', () => {
        expect(() => {
            let product = new Product("1", "Product 1", -1)
        }).toThrow("product: price cannot be empty")
    })
    
    it('should throw error when fields are empty', () => {
        expect(() => {
            let product = new Product("", "", -1)
        }).toThrow("product: id cannot be empty, product: name cannot be empty, product: price cannot be empty")
    })

    it('should change name', () => {
        const p1 = new Product("1", "Product 1", 100)
        p1.changeName('Product 2')

        expect(p1.Name).toBe('Product 2')
    })
    
    it('should change price', () => {
        const p1 = new Product("1", "Product 1", 100)
        p1.changePrice(200)

        expect(p1.Price).toBe(200)
    })
})