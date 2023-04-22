import Invoice from "../domain/invoice.entity";

export default interface InvoiceGateway {
  find(id: string): Promise<Invoice>;
  create(entity: Invoice): Promise<void>;
}