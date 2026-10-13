import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListAttributesQuery } from './list-attributes.query.js';
import {
  ATTRIBUTE_SERVICE,
  type IProductAttributeService,
} from '../../services/interfaces/product-attribute.service.interface.js';
import type { AttributeListResponseDTO } from '../../dtos/responses/attribute-response.dto.js';

@QueryHandler(ListAttributesQuery)
export class ListAttributesHandler
  implements IQueryHandler<ListAttributesQuery, AttributeListResponseDTO>
{
  constructor(
    @Inject(ATTRIBUTE_SERVICE)
    private readonly service: IProductAttributeService,
  ) {}

  async execute(q: ListAttributesQuery): Promise<AttributeListResponseDTO> {
    return this.service.list(q.options);
  }
}
