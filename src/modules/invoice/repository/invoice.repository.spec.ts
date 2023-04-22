import { Sequelize } from "sequelize-typescript";
import Invoice from "../domain/invoice.entity";
import Product from "../domain/product.entity";
import Address from "../value-object/address.value-object";
import InvoiceRepository from "./invoice.repository";
import InvoiceModel from "./invoice.model";
import InvoiceItemModel from "./invoice-items.model";

describe("Invoice repository unit test", () => {

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    });

    sequelize.addModels([InvoiceModel, InvoiceItemModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  })

  const product1 = new Product({
    name: "Product 1",
    price: 100
  });

  const product2 = new Product({
    name: "Product 2",
    price: 200
  });

  const address1 = {
    street: "Street1",
    number: "10",
    zipCode: "04107-020",
    city: "City 1",
    state: "State 1"
  }

  it("Should find a invoice", async() => {
    const invoiceProps = {
      name: "Invoice 1",
      document: "document1",
      address: new Address(address1),
      items: [product1, product2]
    }
    const invoice1 = new Invoice(invoiceProps);
    const items = invoice1.items.map((item) => ({
      id: item.id.id,
      name: item.name,
      price: item.price,
      createdAt: Date(),
      updatedAt: Date(),
    }));

    await InvoiceModel.create(
      {
        id: invoice1.id.id,
        document: invoice1.document,
        name: invoice1.name,
        street: invoice1.address.street,
        number: invoice1.address.number,
        complement: invoice1.address.complement,
        city: invoice1.address.city,
        state: invoice1.address.state,
        zipCode: invoice1.address.zipCode,
        createdAt: invoice1.createdAt,
        updatedAt: invoice1.updatedAt,
        items: items
      },
      {
        include: [{ model: InvoiceItemModel }]
      }
    );

    const invoiceRepository = new InvoiceRepository();
    const invoiceDb = await invoiceRepository.find(invoice1.id.id);

    expect(invoiceDb.id.id).toBe(invoice1.id.id);
    expect(invoiceDb.name).toBe(invoice1.name);
    expect(invoiceDb.document).toBe(invoice1.document);
    expect(invoiceDb.address).toStrictEqual(invoice1.address);
    expect(invoiceDb.items).toStrictEqual(invoice1.items);
  });

  it("Should generate a invoice", async () => {
    const invoiceProps = {
      name: "Invoice 1",
      document: "document1",
      address: new Address(address1),
      items: [product1, product2]
    }
    const invoice1 = new Invoice(invoiceProps);
    const invoiceRepository = new InvoiceRepository();
    await invoiceRepository.create(invoice1);

    const invoiceDb = await InvoiceModel.findOne({
      where: { id: invoice1.id.id },
      include: [{ model: InvoiceItemModel }]
    });

    expect(invoiceDb.id).toBe(invoice1.id.id);
    expect(invoiceDb.name).toBe(invoice1.name);
    expect(invoiceDb.document).toBe(invoice1.document);
    expect(invoiceDb.street).toStrictEqual(invoice1.address.street);
    expect(invoiceDb.items[0].name).toBe(invoice1.items[0].name);
    expect(invoiceDb.items[0].price).toBe(invoice1.items[0].price);
    expect(invoiceDb.items[1].name).toBe(invoice1.items[1].name);
    expect(invoiceDb.items[1].price).toBe(invoice1.items[1].price);

  });
});