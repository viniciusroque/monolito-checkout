import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/product.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import Address from "../../value-object/address.value-object";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.usecase.dto";

export default class GenerateInvoiceUseCase implements UseCaseInterface {

  constructor(private _invoiceRepository: InvoiceGateway){}

  async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
    const address = new Address({
      street: input.street,
      number: input.number,
      complement: input.complement,
      city: input.city,
      state: input.state,
      zipCode: input.zipCode
    });

    const invoice = new Invoice({
      name: input.name,
      document: input.document,
      address: address,
      items: input.items.map((item) => {
        return new Product ({
          id: item.id,
          name: item.name,
          price: item.price
        });
      })
    });

    await this._invoiceRepository.create(invoice);

    const items = invoice.items.map((item) => ({
      id: item.id.id,
      name: item.name,
      price: item.price
    }));

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      items: items,
      total: invoice.total
    }
  }

}