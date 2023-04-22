import Address from "../value-object/address.value-object";
import Invoice from "./invoice.entity";
import Product from "./product.entity";

describe("Invoice entity unit test", () => {

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
  it("Should create a Invoice", () => {

    const invoiceProps = {
      name: "Invoice 1",
      document: "document1",
      address: new Address(address1),
      items: [product1, product2]
    }

    const invoice = new Invoice(invoiceProps);

    expect(invoice.id).toBeDefined();
    expect(invoice.name).toBe(invoiceProps.name);
    expect(invoice.document).toBe(invoiceProps.document);
    expect(invoice.address).toBe(invoiceProps.address);
    expect(invoice.items).toBe(invoiceProps.items);
    expect(invoice.total).toBe(300);
  });

  it("Should throw error when name is empty", () => {

    const invoiceProps = {
      name: "",
      document: "document1",
      address: new Address(address1),
      items: [product1, product2]
    }

    expect(() => {
      new Invoice(invoiceProps);
    }).toThrowError("Name is required.");
  });

  it("Should throw error when document is empty", () => {

    const invoiceProps = {
      name: "Name 1",
      document: "",
      address: new Address(address1),
      items: [product1]
    }

    expect(() => {
      new Invoice(invoiceProps);
    }).toThrowError("Document is required.");
  });
});