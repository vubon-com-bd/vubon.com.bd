export interface ProductClient {
  getById(productId: string): Promise<{
    readonly id: string;
    readonly name: string;
    readonly price: number;
  } | null>;
}
