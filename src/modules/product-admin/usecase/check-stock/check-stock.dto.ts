
export interface CheckStockInputDto {
  productId: string;
}

export interface CheckSockOutputDto {
  productId: string;
  stock: number;
}