import { Sequelize } from "sequelize-typescript";
import InvoiceRepository from "../repository/invoice.repository";
import InvoiceModel from "../repository/invoice.model";
import InvoiceItemModel from "../repository/invoice-items.model";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import Product from "../domain/product.entity";
import InvoiceFacade from "./invoice.facade";

describe("Invoice facade test", () => {

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

  const input = {
    name: "Invoice 1",
    document: "document1",
    street: "Street1",
    number: "10",
    complement: "Complement 1",
    zipCode: "04107-020",
    city: "City 1",
    state: "State 1",
    items: [
      {
       id: product1.id.id,
       name: product1.name,
       price: product1.price
      },
      {
        id: product2.id.id,
        name: product2.name,
        price: product2.price
       }
    ]
  }

  it("Should generate a invoice", async() =>{
    const invoiceRepository = new InvoiceRepository();
    const generateUseCase = new GenerateInvoiceUseCase(invoiceRepository);
    const invoiceFacade = new InvoiceFacade({
      generateUseCase: generateUseCase,
      findUseCase: undefined
    });
    const output = await invoiceFacade.generate(input);

    expect(output.id).toBeDefined();
    expect(output.name).toBe(input.name);
    expect(output.document).toBe(input.document);
    expect(output.street).toBe(input.street);
    expect(output.items[0].name).toBe(input.items[0].name);
    expect(output.items[0].price).toBe(input.items[0].price);
    expect(output.items[1].name).toBe(input.items[1].name);
    expect(output.items[1].price).toBe(input.items[1].price);

    const invoiceDb = await InvoiceModel.findOne({
      where: { id: output.id },
      include: [{ model: InvoiceItemModel }]
    });

    expect(invoiceDb.id).toBe(output.id);
    expect(invoiceDb.name).toBe(input.name);
    expect(invoiceDb.document).toBe(input.document);
    expect(invoiceDb.street).toBe(input.street);
    expect(invoiceDb.items[0].name).toBe(input.items[0].name);
    expect(invoiceDb.items[0].price).toBe(input.items[0].price);
    expect(invoiceDb.items[1].name).toBe(input.items[1].name);
    expect(invoiceDb.items[1].price).toBe(input.items[1].price);
  });

  it("Should generate a invoice", async() =>{
    const invoiceRepository = new InvoiceRepository();
    const generateUseCase = new GenerateInvoiceUseCase(invoiceRepository);
    const findUseCase = new FindInvoiceUseCase(invoiceRepository);

    const invoiceFacade = new InvoiceFacade({
      generateUseCase: generateUseCase,
      findUseCase: findUseCase
    });
    const outputGenerated = await invoiceFacade.generate(input);
    const id = outputGenerated.id;
    const outputFound = await invoiceFacade.find({ id: id });

    expect(outputFound.id).toBe(id);
    expect(outputFound.name).toBe(input.name);
    expect(outputFound.document).toBe(input.document);
    expect(outputFound.address.street).toBe(input.street);
    expect(outputFound.items[0].name).toBe(input.items[0].name);
    expect(outputFound.items[0].price).toBe(input.items[0].price);
    expect(outputFound.items[1].name).toBe(input.items[1].name);
    expect(outputFound.items[1].price).toBe(input.items[1].price);
  });

});