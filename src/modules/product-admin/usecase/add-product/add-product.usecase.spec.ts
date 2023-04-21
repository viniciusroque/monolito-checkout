import Product from "../../domain/product.entity";
import AddProductUseCase from "./add-product.usecase";

describe("Add Product usecase unit test", () => {

  const input = {
    name: "Product 1",
    description: "Description product 1",
    purchasePrice: 100,
    stock: 10
  }
  const product = new Product(input);
  const MockRepository = () => {
    return {
      add: jest.fn(),
      find: jest.fn().mockReturnValue(Promise.resolve(product)),
    }
  }
  it("Should add a product", async() => {
    const productRepository = MockRepository();
    const useCase = new AddProductUseCase(productRepository);
    const output = await useCase.execute(input);

    expect(productRepository.add).toBeCalled();
    expect(output.id).toBeDefined();
    expect(output.name).toBe(input.name);
    expect(output.description).toBe(input.description);
    expect(output.purchasePrice).toBe(input.purchasePrice);
    expect(output.stock).toBe(input.stock);

  });
});