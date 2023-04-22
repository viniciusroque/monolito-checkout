import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import InvoiceFacadeInterface, { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO, GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./invoice.facade.interface";

interface UseCaseProps  {
  generateUseCase: UseCaseInterface
  findUseCase: UseCaseInterface
}

export default class InvoiceFacade implements InvoiceFacadeInterface {

  private _generateUseCase: UseCaseInterface;
  private _findUseCase: UseCaseInterface;

  constructor(private _useCaseProps: UseCaseProps){
    this._generateUseCase = _useCaseProps.generateUseCase;
    this._findUseCase = _useCaseProps.findUseCase;
  }
  async generate(
      input: GenerateInvoiceUseCaseInputDto
    ): Promise<GenerateInvoiceUseCaseOutputDto> {

    return await this._generateUseCase.execute(input);
  }
  async find(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
    return await this._findUseCase.execute(input);
  }

}