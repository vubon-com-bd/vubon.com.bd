/**
 * ListUsersQuery
 * @module user-service/application/queries/user
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListUsersQuery extends BaseQuery {
  readonly type = 'user.list';

  constructor(
    public readonly page: number = 1,
    public readonly limit: number = 20,
    public readonly statusFilter?: string,
    public readonly userTypeFilter?: string,
    public readonly search?: string
  ) {
    super();
  }
}
