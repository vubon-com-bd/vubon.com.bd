import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetProductBySlugQuery } from './get-product-by-slug.query';
import type { ProductServiceInterface } from '../../services/interfaces/product.service.interface';
import type { ProductResponseDTO } from '../../dtos/responses/product-response.dto';
import { ProductNotFoundAppError } from '../../errors/product.errors';

@QueryHandler(GetProductBySlugQuery)
export class GetProductBySlugHandler
  extends BaseQueryHandler<GetProductBySlugQuery, ProductResponseDTO>
  implements IQueryHandler<GetProductBySlugQuery>
{
  readonly queryType = 'product.get-by-slug';

  constructor(private readonly productService: ProductServiceInterface) {
    super();
  }

  async execute(query: GetProductBySlugQuery): Promise<ProductResponseDTO> {
    const product = await this.productService.findBySlug(query.slug);
    if (!product) throw new ProductNotFoundAppError(query.slug);
    return product;
  }
}
