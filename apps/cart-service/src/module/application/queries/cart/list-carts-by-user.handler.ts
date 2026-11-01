/**
 * ListCartsByUserQueryHandler
 */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { ListCartsByUserQuery } from './list-carts-by-user.query.js';
import {
  CART_SERVICE,
  type ICartService,
} from '../../services/interfaces/cart.service.interface.js';

@QueryHandler(ListCartsByUserQuery)
export class ListCartsByUserQueryHandler
  implements IQueryHandler<ListCartsByUserQuery>
{
  private readonly logger = new Logger(ListCartsByUserQueryHandler.name);

  constructor(
    @Inject(CART_SERVICE)
    private readonly cartService: ICartService,
  ) {}

  async execute(query: ListCartsByUserQuery): Promise<{
    readonly items: readonly unknown[];
    readonly total: number;
    readonly page: number;
    readonly limit: number;
    readonly totalPages: number;
  }> {
    const { userId, page = 1, limit = 20 } = query.input;

    this.logger.log(`Listing carts for user ${userId} (page=${page}, limit=${limit})`);

    try {
      const result = await this.cartService.list({
        page,
        limit,
        filter: { userId },
      });

      return {
        items: result.items,
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`Failed to list carts for user ${userId}: ${msg}`);
      return { items: [], total: 0, page, limit, totalPages: 0 };
    }
  }
}
