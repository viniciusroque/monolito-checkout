import Product from "./product.entity";

describe("Unit test product entity", () => {
  it("Should create a product", () => {
    const productProps1 = {
      name: "Product 1",
      description: "Description product 1",
      purchasePrice: 100,
      stock: 10
    }
    const product1 = new Product(productProps1);
    expect(product1.id).toBeDefined();
    expect(product1.createdAt).toBeDefined();
    expect(product1.updatedAt).toBeDefined();
    expect(product1.name).toBe("Product 1");
    expect(product1.purchasePrice).toBe(100);

    const productProps2 = {
      name: "Product 2",
      description: "Description product 2",
      purchasePrice: 200,
      stock: 20
    }
    const product2 = new Product(productProps2);
    expect(product2.id).toBeDefined();
    expect(product2.createdAt).toBeDefined();
    expect(product2.updatedAt).toBeDefined();
  });
});