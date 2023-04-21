import { Sequelize } from "sequelize-typescript";
import Product from "../domain/product.entity";
import ProductRepository from "./product.repository";
import Id from "../../@shared/domain/value-object/id.value-object";
import { ProductModel } from "./product.model";

describe("Product repository unit test", () => {
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
    const productProps = {
      id: new Id("product1"),
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const product = new Product(productProps);
    const productRepository = new ProductRepository();
    await productRepository.add(product);

    const productDb = await ProductModel.findOne({
      where: {
        id: productProps.id.id
      }
    });

    expect(productDb.id).toBe(productProps.id.id);
    expect(productDb.name).toBe(productProps.name);
    expect(productDb.description).toBe(productProps.description);
    expect(productDb.purchasePrice).toBe(productProps.purchasePrice);
    expect(productDb.stock).toBe(productProps.stock);
  });

  it("Should find a product", async() => {
    const productProps = {
      id: new Id("product1"),
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const product = new Product(productProps);
    const productRepository = new ProductRepository();

    await ProductModel.create({
      id: product.id.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    });

    const productFound = await productRepository.find(productProps.id.id);
    expect(productFound.id.id).toBe(productProps.id.id);
    expect(productFound.name).toBe(productProps.name);
    expect(productFound.description).toBe(productProps.description);
    expect(productFound.purchasePrice).toBe(productProps.purchasePrice);
    expect(productFound.stock).toBe(productProps.stock);

  });

  it("Should not found a product", async() => {
    const id = "123";
    const productRepository = new ProductRepository();
    await expect(productRepository.find(id)).rejects.toThrowError(`Product with id ${id} not found`);
  });
});