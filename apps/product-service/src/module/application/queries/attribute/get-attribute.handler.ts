import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetAttributeQuery } from './get-attribute.query.js';
import {
  ATTRIBUTE_SERVICE,
  type IProductAttributeService,
} from '../../services/interfaces/product-attribute.service.interface.js';
import type { AttributeResponseDTO } from '../../dtos/responses/attribute-response.dto.js';

@QueryHandler(GetAttributeQuery)
export class GetAttributeHandler
  implements IQueryHandler<GetAttributeQuery, AttributeResponseDTO>
{
  constructor(
    @Inject(ATTRIBUTE_SERVICE)
    private readonly service: IProductAttributeService,
  ) {}

  async execute(q: GetAttributeQuery): Promise<AttributeResponseDTO> {
    return this.service.getById(q.attributeId);
  }
}
