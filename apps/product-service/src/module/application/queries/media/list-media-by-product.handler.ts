import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListMediaByProductQuery } from './list-media-by-product.query.js';
import { MEDIA_SERVICE, type IMediaService, type MediaItemDTO } from '../../services/interfaces/media.service.interface.js';

@QueryHandler(ListMediaByProductQuery)
export class ListMediaByProductHandler
  implements IQueryHandler<ListMediaByProductQuery, readonly MediaItemDTO[]>
{
  constructor(@Inject(MEDIA_SERVICE) private readonly service: IMediaService) {}
  async execute(q: ListMediaByProductQuery): Promise<readonly MediaItemDTO[]> {
    return this.service.listByProduct(q.productId);
  }
}
