import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { ProductAttributeEntity } from '../../../domain/entities/product-attribute.entity';
import type { AddAttributeRequestDTO } from '../../dtos/requests/attribute/add-attribute.dto';
import type { AttributeResponseDTO } from '../../dtos/responses/attribute-response.dto';

export interface ProductAttributeServiceInterface
  extends BaseServiceInterface<ProductAttributeEntity, string> {
  add(productId: string, input: AddAttributeRequestDTO): Promise<AttributeResponseDTO>;
  update(attributeId: string, value: string): Promise<AttributeResponseDTO>;
  remove(attributeId: string): Promise<void>;
  listByProduct(productId: string): Promise<readonly AttributeResponseDTO[]>;
}
