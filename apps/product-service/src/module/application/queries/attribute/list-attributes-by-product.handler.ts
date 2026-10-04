import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListAttributesByProductQuery } from './list-attributes-by-product.query.js';
import { ATTRIBUTE_SERVICE, type IAttributeService } from '../../services/interfaces/attribute.service.interface.js';
import type { AttributeResponseDTO } from '../../dtos/responses/attribute-response.dto.js';

@QueryHandler(ListAttributesByProductQuery)
export class ListAttributesByProductHandler
  implements IQueryHandler<ListAttributesByProductQuery, readonly AttributeResponseDTO[]>
{
  constructor(@Inject(ATTRIBUTE_SERVICE) private readonly service: IAttributeService) {}
  async execute(q: ListAttributesByProductQuery): Promise<readonly AttributeResponseDTO[]> {
    return this.service.listByProduct(q.productId);
  }
}
