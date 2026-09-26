import { UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { GetProductQuery } from '../../../application/queries/product/get-product.query';
import { ListProductsQuery } from '../../../application/queries/product/list-products.query';

/**
 * GraphQL Product Resolver (placeholder)
 *
 * @nestjs/graphql not installed — structural stub.
 * When installed, decorate with @Resolver, @Query, @Mutation.
 */
export class ProductResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UseGuards(JwtAuthGuard)
  async product(id: string): Promise<unknown> {
    return this.queryBus.execute(new GetProductQuery(id));
  }

  @UseGuards(JwtAuthGuard)
  async products(page = 1, limit = 20): Promise<unknown> {
    void this.commandBus;
    return this.queryBus.execute(new ListProductsQuery(page, limit));
  }
}
