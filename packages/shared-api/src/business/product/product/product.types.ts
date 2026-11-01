export interface Product {
  readonly id: string;
  readonly sku: string;
  readonly name: string;
  readonly description?: string;
  readonly price: number;
  readonly currency: string;
  readonly categoryId: string;
  readonly brandId?: string;
  readonly images: readonly string[];
  readonly inStock: boolean;
  readonly createdAt: string;
}

export interface CreateProductRequest {
  readonly sku: string;
  readonly name: string;
  readonly description?: string;
  readonly price: number;
  readonly currency: string;
  readonly categoryId: string;
  readonly brandId?: string;
  readonly images?: readonly string[];
}

export interface UpdateProductRequest {
  readonly name?: string;
  readonly description?: string;
  readonly price?: number;
  readonly images?: readonly string[];
}

export interface ProductListResponse {
  readonly products: readonly Product[];
  readonly total: number;
}
