import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListAuthPermissionsQuery } from './list-auth-permissions.query';
import type { AuthPermissionRepository } from '../../../domain/repositories/auth-permission.repository.interface';

@QueryHandler(ListAuthPermissionsQuery)
export class ListAuthPermissionsHandler
  extends BaseQueryHandler<ListAuthPermissionsQuery, readonly string[]>
  implements IQueryHandler<ListAuthPermissionsQuery>
{
  readonly queryType = 'auth.list-permissions';

  constructor(private readonly permissionRepo: AuthPermissionRepository) {
    super();
  }

  async execute(_query: ListAuthPermissionsQuery): Promise<readonly string[]> {
    const entities = await this.permissionRepo.findAll();
    return entities.map((e) => e.name.value);
  }
}
