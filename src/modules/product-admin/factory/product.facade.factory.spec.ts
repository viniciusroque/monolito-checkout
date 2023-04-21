import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../repository/product.model";
import ProductAdmFacadeFactory from "./product.facade.factory";
import ProductRepository from "../repository/product.repository";
import Product from "../domain/product.entity";

describe("Product facade factory test", () => {

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

  it("Should create a product", async() => {
    const input = {
      id: "product1",
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10
    }

    const productAdmFacade = ProductAdmFacadeFactory.create();
    const output = productAdmFacade.addProduct(input);

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

  it("Should get stock of a product", async() => {
    const product = new Product({
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10
  });

    const productRepository =  new ProductRepository();
    productRepository.add(product)
    const productAdmFacade = ProductAdmFacadeFactory.create();
    const output = await productAdmFacade.checkStock({ productId: product.id.id });

    expect(output.productId).toBe(product.id.id);
    expect(output.stock).toBe(product.stock);

  });
});