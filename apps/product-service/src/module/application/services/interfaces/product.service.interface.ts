import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { ProductEntity } from '../../../domain/entities/product.entity';
import type { CreateProductRequestDTO } from '../../dtos/requests/product/create-product.dto';
import type { UpdateProductRequestDTO } from '../../dtos/requests/product/update-product.dto';
import type { ProductResponseDTO } from '../../dtos/responses/product-response.dto';

export interface ProductServiceInterface
  extends BaseServiceInterface<ProductEntity, string> {
  create(input: CreateProductRequestDTO): Promise<ProductResponseDTO>;
  update(productId: string, input: UpdateProductRequestDTO): Promise<ProductResponseDTO>;
  delete(productId: string): Promise<void>;
  publish(productId: string): Promise<ProductResponseDTO>;
  archive(productId: string): Promise<ProductResponseDTO>;
  findById(productId: string): Promise<ProductResponseDTO | null>;
  findBySlug(slug: string): Promise<ProductResponseDTO | null>;
  list(page: number, limit: number): Promise<readonly ProductResponseDTO[]>;
  search(term: string, limit: number): Promise<readonly ProductResponseDTO[]>;
}
