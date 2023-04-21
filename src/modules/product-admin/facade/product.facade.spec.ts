import { Sequelize } from "sequelize-typescript";
import ProductAdmFacade from "./product.facade";
import { ProductModel } from "../repository/product.model";
import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";

describe("Product facade test", () => {

  let sequelize: Sequelize;
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  })

  it("Should add a product", async () => {
    const input = {
      id: "product1",
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10
    }

    const productRepository = new ProductRepository();
    const addProductUseCase = new AddProductUseCase(productRepository);

    const productFacade = new ProductAdmFacade({
      addUseCase: addProductUseCase,
      stockUseCase: undefined
    });
    await productFacade.addProduct(input);
    const productDb = await ProductModel.findOne({
      where: { id: input.id }
    });

    expect(productDb.id).toBe(input.id);
    expect(productDb.name).toBe(input.name);
    expect(productDb.description).toBe(input.description);
    expect(productDb.purchasePrice).toBe(input.purchasePrice);
    expect(productDb.stock).toBe(input.stock);
    expect(productDb.createdAt).toBeDefined();
    expect(productDb.updatedAt).toBeDefined();


  });
});