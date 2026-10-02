/**
 * IAttributeService Interface
 */
import type { AddAttributeRequestDTO } from '../../dtos/requests/attribute/add-attribute.dto.js';
import type { UpdateAttributeRequestDTO } from '../../dtos/requests/attribute/update-attribute.dto.js';
import type { AttributeResponseDTO } from '../../dtos/responses/attribute-response.dto.js';

export const ATTRIBUTE_SERVICE = Symbol('ATTRIBUTE_SERVICE');

export interface IAttributeService {
  add(dto: AddAttributeRequestDTO, actorId: string): Promise<AttributeResponseDTO>;
  update(dto: UpdateAttributeRequestDTO): Promise<AttributeResponseDTO>;
  remove(attributeId: string, actorId: string): Promise<void>;
  listByProduct(productId: string): Promise<readonly AttributeResponseDTO[]>;
}
