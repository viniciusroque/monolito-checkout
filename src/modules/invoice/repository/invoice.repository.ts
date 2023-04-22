import Invoice from "../domain/invoice.entity";
import Product from "../domain/product.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import Address from "../value-object/address.value-object";
import InvoiceItemModel from "./invoice-items.model";
import InvoiceModel from "./invoice.model";


export default class InvoiceRepository implements InvoiceGateway {
  async create(entity: Invoice): Promise<void> {
    await InvoiceModel.create(
      {
        id: entity.id.id,
        document: entity.document,
        name: entity.name,
        street: entity.address.street,
        number: entity.address.number,
        complement: entity.address.complement,
        city: entity.address.city,
        state: entity.address.state,
        zipCode: entity.address.zipCode,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
        items: entity.items.map((item) => ({
          id: item.id.id,
          name: item.name,
          price: item.price,
          createdAt: Date(),
          updatedAt: Date(),
        }))
      },
      {
        include: [{ model: InvoiceItemModel }]
      }
    );
  }

  async find(id: string): Promise<Invoice> {
    const invoiceDb = await InvoiceModel.findOne({
      where: { id: id },
      include: [{ model: InvoiceItemModel }]
    });

    if (!invoiceDb) {
      throw new Error ("Invoice not found.");
    }
    return new Invoice({
      id: invoiceDb.id,
      name: invoiceDb.name,
      document: invoiceDb.document,
      address: new Address({
        street: invoiceDb.street,
        number: invoiceDb.number,
        complement: invoiceDb.complement || undefined,
        zipCode: invoiceDb.zipCode,
        city: invoiceDb.city,
        state: invoiceDb.state
      }),
      items: invoiceDb.items.map((item) => {
        return new Product({
          id: item.id,
          name: item.name,
          price: item.price
        })
      })
    });
  }
}