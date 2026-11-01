/**
 * ListCartsByUserQuery — list all carts for a user
 */
import { Query } from '@nestjs/cqrs';

export interface ListCartsByUserQueryInput {
  readonly userId: string;
  readonly page?: number;
  readonly limit?: number;
}

export class ListCartsByUserQuery extends Query<{
  readonly items: readonly unknown[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}> {
  constructor(public readonly input: ListCartsByUserQueryInput) {
    super();
  }
}
