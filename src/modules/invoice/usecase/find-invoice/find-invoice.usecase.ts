import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "./find-invoice.usecase.dto";

export default class FindInvoiceUseCase implements UseCaseInterface {

  constructor(private _invoiceRepository: InvoiceGateway){}

  async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
    const invoice = await this._invoiceRepository.find(input.id);
    const items = invoice.items.map((item) => ({
      id: item.id.id,
      name: item.name,
      price: item.price
    }));
    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      address: invoice.address.getAddress(),
      items: items,
      total: invoice.total,
      createdAt: invoice.createdAt
    }
  }

}