import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/product.entity";
import Address from "../../value-object/address.value-object";
import FindInvoiceUseCase from "./find-invoice.usecase";

describe("Invoice use case unit test", () => {
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
  const invoiceProps = {
    name: "Invoice 1",
    document: "document1",
    address: new Address(address1),
    items: [product1, product2]
  }
  const invoice1 = new Invoice(invoiceProps);

  const mockRepository = () => ({
    find: jest.fn().mockReturnValue(Promise.resolve(invoice1)),
    create: jest.fn()
  });
  it("Should find a invoice", async() => {
    const invoiceRepository = mockRepository();
    const invoiceUseCase = new FindInvoiceUseCase(invoiceRepository);
    const output = await invoiceUseCase.execute({ id: invoice1.id.id });

    expect(output.id).toBe(invoice1.id.id);
    expect(output.name).toBe(invoice1.name);
    expect(output.document).toBe(invoice1.document);
    expect(output.address).toEqual(address1);
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