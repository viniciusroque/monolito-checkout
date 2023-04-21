import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import ProductGateway from "../../gateway/product.gateway";
import { CheckStockInputDto, CheckSockOutputDto } from "./check-stock.dto";

export default class CheckStockUseCase implements UseCaseInterface {

  constructor(private _productRepository: ProductGateway){}

  async execute(input: CheckStockInputDto): Promise<CheckSockOutputDto> {
    const productModel = await this._productRepository.find(input.productId);
    return {
      productId: productModel.id.id,
      stock: productModel.stock
    }

  }

}