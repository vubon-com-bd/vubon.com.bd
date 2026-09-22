import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { ProductInventoryServiceInterface } from '../interfaces/product-inventory.service.interface';
import type { ProductInventoryRepository } from '../../../domain/repositories/product-inventory.repository.interface';
import { ProductInventoryEntity } from '../../../domain/entities/product-inventory.entity';
import { InventoryIdVO } from '../../../domain/value-objects/primitives/inventory-id.vo';
import { ProductIdVO } from '../../../domain/value-objects/primitives/product-id.vo';
import { InventoryQuantityVO } from '../../../domain/value-objects/primitives/inventory-quantity.vo';
import { InventoryOperationFailedError } from '../../errors/inventory.errors';
import type { InventoryResponseDTO } from '../../dtos/responses/inventory-response.dto';

@Injectable()
export class ProductInventoryService
  extends BaseService<ProductInventoryEntity, string>
  implements ProductInventoryServiceInterface
{
  readonly name = 'ProductInventoryService';

  constructor(
    private readonly inventoryRepo: ProductInventoryRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async findByProduct(productId: string): Promise<InventoryResponseDTO | null> {
    const entity = await this.inventoryRepo.findByProduct(ProductIdVO.create(productId));
    return entity ? this.toDTO(entity) : null;
  }

  async updateQuantity(productId: string, quantity: number): Promise<InventoryResponseDTO> {
    const entity = await this.inventoryRepo.findByProduct(ProductIdVO.create(productId));
    if (!entity) throw new InventoryOperationFailedError('inventory not found');
    const updated = entity.updateQuantity(InventoryQuantityVO.create(quantity));
    await this.inventoryRepo.save(updated);
    await this.publishEvents(updated);
    return this.toDTO(updated);
  }

  async adjust(productId: string, delta: number): Promise<InventoryResponseDTO> {
    const entity = await this.inventoryRepo.findByProduct(ProductIdVO.create(productId));
    if (!entity) throw new InventoryOperationFailedError('inventory not found');
    const next = entity.quantity.value + delta;
    return this.updateQuantity(productId, Math.max(0, next));
  }

  async reserve(productId: string, quantity: number, orderId: string): Promise<void> {
    const entity = await this.inventoryRepo.findByProduct(ProductIdVO.create(productId));
    if (!entity) throw new InventoryOperationFailedError('inventory not found');
    const updated = entity.reserve(quantity, orderId);
    await this.inventoryRepo.save(updated);
    await this.publishEvents(updated);
  }

  async release(productId: string, quantity: number, orderId: string): Promise<void> {
    const entity = await this.inventoryRepo.findByProduct(ProductIdVO.create(productId));
    if (!entity) throw new InventoryOperationFailedError('inventory not found');
    const updated = entity.release(quantity, orderId);
    await this.inventoryRepo.save(updated);
    await this.publishEvents(updated);
  }

  private toDTO(entity: ProductInventoryEntity): InventoryResponseDTO {
    void InventoryIdVO;
    return {
      productId: entity.productId.value,
      quantity: entity.quantity.value,
      reserved: entity.reserved.value,
      available: entity.available,
      status: entity.status.value,
    } as unknown as InventoryResponseDTO;
  }

  private async publishEvents(entity: ProductInventoryEntity): Promise<void> {
    const events = entity.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }
  }
}
