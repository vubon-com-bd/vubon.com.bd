/**
 * IProductService Interface
 */
import type { CreateProductRequestDTO } from '../../dtos/requests/product/create-product.dto.js';
import type { UpdateProductRequestDTO } from '../../dtos/requests/product/update-product.dto.js';
import type { ProductResponseDTO } from '../../dtos/responses/product-response.dto.js';
import type { ProductDetailResponseDTO } from '../../dtos/responses/product-detail-response.dto.js';

export const PRODUCT_SERVICE = Symbol('PRODUCT_SERVICE');

export interface IProductService {
  create(dto: CreateProductRequestDTO, actorId: string): Promise<ProductResponseDTO>;
  update(productId: string, dto: UpdateProductRequestDTO, actorId: string): Promise<ProductResponseDTO>;
  publish(productId: string, actorId: string): Promise<ProductResponseDTO>;
  unpublish(productId: string, actorId: string, reason?: string): Promise<ProductResponseDTO>;
  archive(productId: string, actorId: string): Promise<ProductResponseDTO>;
  softDelete(productId: string, actorId: string): Promise<void>;
  feature(productId: string, actorId: string): Promise<ProductResponseDTO>;
  unfeature(productId: string, actorId: string): Promise<ProductResponseDTO>;
  duplicate(productId: string, newName: string, actorId: string): Promise<ProductResponseDTO>;
  getDetail(productId: string): Promise<ProductDetailResponseDTO>;
}
