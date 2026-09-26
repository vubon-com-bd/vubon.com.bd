import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { ProductVariantEntity } from '../../../domain/entities/product-variant.entity';
import type { VariantResponseDTO } from '../../dtos/responses/variant-response.dto';

export interface AddVariantServiceInput {
  readonly productId: string;
  readonly name: string;
  readonly sku: string;
  readonly price: number;
  readonly type: string;
  readonly options: readonly { name: string; value: string }[];
  readonly weight?: number;
  readonly barcode?: string;
}

export interface ProductVariantServiceInterface
  extends BaseServiceInterface<ProductVariantEntity, string> {
  add(productId: string, input: AddVariantServiceInput): Promise<VariantResponseDTO>;
  updatePrice(variantId: string, amount: number): Promise<VariantResponseDTO>;
  remove(variantId: string): Promise<void>;
  setDefault(productId: string, variantId: string): Promise<void>;
  listByProduct(productId: string): Promise<readonly VariantResponseDTO[]>;
  findById(variantId: string): Promise<VariantResponseDTO | null>;
}
