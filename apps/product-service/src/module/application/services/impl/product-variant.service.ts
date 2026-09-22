import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { ProductVariantServiceInterface, AddVariantServiceInput } from '../interfaces/product-variant.service.interface';
import type { ProductVariantRepository } from '../../../domain/repositories/product-variant.repository.interface';
import { ProductVariantEntity } from '../../../domain/entities/product-variant.entity';
import { VariantIdVO } from '../../../domain/value-objects/primitives/variant-id.vo';
import { ProductIdVO } from '../../../domain/value-objects/primitives/product-id.vo';
import { VariantOperationFailedError } from '../../errors/variant.errors';
import type { VariantResponseDTO } from '../../dtos/responses/variant-response.dto';

@Injectable()
export class ProductVariantService
  extends BaseService<ProductVariantEntity, string>
  implements ProductVariantServiceInterface
{
  readonly name = 'ProductVariantService';

  constructor(
    private readonly variantRepo: ProductVariantRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async add(productId: string, input: AddVariantServiceInput): Promise<VariantResponseDTO> {
    void input;
    void productId;
    throw new VariantOperationFailedError('add not yet wired');
  }

  async updatePrice(variantId: string, amount: number): Promise<VariantResponseDTO> {
    void amount;
    const entity = await this.variantRepo.findById(VariantIdVO.create(variantId));
    if (!entity) throw new VariantOperationFailedError('variant not found');
    await this.variantRepo.save(entity);
    return this.toDTO(entity);
  }

  async remove(variantId: string): Promise<void> {
    await this.variantRepo.delete(VariantIdVO.create(variantId));
  }

  async setDefault(productId: string, variantId: string): Promise<void> {
    void productId;
    const entity = await this.variantRepo.findById(VariantIdVO.create(variantId));
    if (!entity) throw new VariantOperationFailedError('variant not found');
    const updated = entity.setDefault();
    await this.variantRepo.save(updated);
  }

  async listByProduct(productId: string): Promise<readonly VariantResponseDTO[]> {
    const rows = await this.variantRepo.findByProduct(ProductIdVO.create(productId));
    return rows.map((r) => this.toDTO(r));
  }

  async findById(variantId: string): Promise<VariantResponseDTO | null> {
    const entity = await this.variantRepo.findById(VariantIdVO.create(variantId));
    return entity ? this.toDTO(entity) : null;
  }

  private toDTO(entity: ProductVariantEntity): VariantResponseDTO {
    return {
      id: entity.id.value,
      productId: entity.productId.value,
      name: entity.name.value,
      sku: entity.sku.value,
      price: entity.price.value,
      isDefault: entity.isDefault,
    } as unknown as VariantResponseDTO;
  }
}
