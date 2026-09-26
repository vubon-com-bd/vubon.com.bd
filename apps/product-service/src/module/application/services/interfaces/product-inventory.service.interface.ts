import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { ProductInventoryEntity } from '../../../domain/entities/product-inventory.entity';
import type { InventoryResponseDTO } from '../../dtos/responses/inventory-response.dto';

export interface ProductInventoryServiceInterface
  extends BaseServiceInterface<ProductInventoryEntity, string> {
  findByProduct(productId: string): Promise<InventoryResponseDTO | null>;
  updateQuantity(productId: string, quantity: number): Promise<InventoryResponseDTO>;
  adjust(productId: string, delta: number): Promise<InventoryResponseDTO>;
  reserve(productId: string, quantity: number, orderId: string): Promise<void>;
  release(productId: string, quantity: number, orderId: string): Promise<void>;
}
