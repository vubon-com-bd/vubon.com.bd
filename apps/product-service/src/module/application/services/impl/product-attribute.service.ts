import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { ProductAttributeServiceInterface } from '../interfaces/product-attribute.service.interface';
import type { ProductAttributeRepository } from '../../../domain/repositories/product-attribute.repository.interface';
import { ProductAttributeEntity } from '../../../domain/entities/product-attribute.entity';
import { AttributeIdVO } from '../../../domain/value-objects/primitives/attribute-id.vo';
import { ProductIdVO } from '../../../domain/value-objects/primitives/product-id.vo';
import { AttributeValueVO } from '../../../domain/value-objects/primitives/attribute-value.vo';
import { ProductOperationFailedError } from '../../errors/product.errors';
import type { AddAttributeRequestDTO } from '../../dtos/requests/attribute/add-attribute.dto';
import type { AttributeResponseDTO } from '../../dtos/responses/attribute-response.dto';

@Injectable()
export class ProductAttributeService
  extends BaseService<ProductAttributeEntity, string>
  implements ProductAttributeServiceInterface
{
  readonly name = 'ProductAttributeService';

  constructor(private readonly attributeRepo: ProductAttributeRepository) {
    super();
  }

  async add(productId: string, input: AddAttributeRequestDTO): Promise<AttributeResponseDTO> {
    void input;
    void productId;
    throw new ProductOperationFailedError('add attribute not yet wired');
  }

  async update(attributeId: string, value: string): Promise<AttributeResponseDTO> {
    const entity = await this.attributeRepo.findById(AttributeIdVO.create(attributeId));
    if (!entity) throw new ProductOperationFailedError('attribute not found');
    const updated = entity.updateValue(AttributeValueVO.create(value));
    await this.attributeRepo.save(updated);
    return this.toDTO(updated);
  }

  async remove(attributeId: string): Promise<void> {
    await this.attributeRepo.delete(AttributeIdVO.create(attributeId));
  }

  async listByProduct(productId: string): Promise<readonly AttributeResponseDTO[]> {
    const rows = await this.attributeRepo.findByProduct(ProductIdVO.create(productId));
    return rows.map((r) => this.toDTO(r));
  }

  private toDTO(entity: ProductAttributeEntity): AttributeResponseDTO {
    return {
      id: entity.id.value,
      productId: entity.productId.value,
      name: entity.name.value,
      value: entity.value.value,
    } as unknown as AttributeResponseDTO;
  }
}
