import ProductAdmFacade from "../facade/product.facade";
import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import CheckStockUseCase from "../usecase/check-stock/check-stock.usecase";

export default class ProductAdmFacadeFactory {

  static create(){
    const productRepository = new ProductRepository();
    const addUseCase = new AddProductUseCase(productRepository)
    const sockUseCase = new CheckStockUseCase(productRepository)
    const productFacade = new ProductAdmFacade({
      addUseCase: addUseCase,
      stockUseCase: sockUseCase
    });

    return productFacade;
  }
}