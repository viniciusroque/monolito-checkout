import Product from "../../domain/product.entity";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

describe("Invoice use case unit test", () => {
  const product1 = new Product({
    name: "Product 1",
    price: 100
  });

  const product2 = new Product({
    name: "Product 2",
    price: 200
  });

  const mockRepository = () => ({
    find: jest.fn(),
    create: jest.fn()
  });
  it("Should generate a invoice", async() => {
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
    const invoiceRepository = mockRepository();
    const invoiceUseCase = new GenerateInvoiceUseCase(invoiceRepository);
    const output = await invoiceUseCase.execute(input);

    expect(output.id).toBeDefined();
    expect(output.name).toBe(input.name);
    expect(output.document).toBe(input.document);
    expect(output.street).toBe(input.street);
    expect(output.number).toBe(input.number);
    expect(output.complement).toBe(input.complement);
    expect(output.city).toBe(input.city);
    expect(output.state).toBe(input.state);
    expect(output.zipCode).toEqual(input.zipCode);
    expect(output.total).toEqual(300);
    expect(output.items).toEqual([
      {
        id: product1.id.id,
        name: product1.name,
        price: product1.price
      },
      {
        id: product2.id.id,
        name: product2.name,
        price: product2.price
      },
    ]);
  });
});