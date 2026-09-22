import { UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { ListBrandsQuery } from '../../../application/queries/brand/list-brands.query';

/**
 * GraphQL Brand Resolver (placeholder)
 */
export class BrandResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @UseGuards(JwtAuthGuard)
  async brands(): Promise<unknown> {
    return this.queryBus.execute(new ListBrandsQuery());
  }
}
