
import Product from "../../domain/product.entity";
import CheckStockUseCase from "./check-stock.usecase";

describe("Check stock use case unit test", () => {

  const ProductProps = {
    name: "Product 1",
    description: "Description product 1",
    purchasePrice: 100,
    stock: 10
  }
  const product = new Product(ProductProps);
  const MockRepository = () => {
    return {
      add: jest.fn(),
      find: jest.fn().mockReturnValue(Promise.resolve(product)),
    }
  }
  it("Should get stock of a product", async() => {
    const input = {
      productId: product.id.id
    }
    const productRepository = MockRepository();
    const checkStockUseCase = new CheckStockUseCase(productRepository);
    const output = await checkStockUseCase .execute(input);

    expect(productRepository.find).toBeCalled();
    expect(output.productId).toBe(input.productId);
    expect(output.stock).toBe(ProductProps.stock);

  });
});