import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListUserPermissionsQuery } from './list-user-permissions.query';
import type { AuthPermissionRepository } from '../../../domain/repositories/auth-permission.repository.interface';

@QueryHandler(ListUserPermissionsQuery)
export class ListUserPermissionsHandler
  extends BaseQueryHandler<ListUserPermissionsQuery, readonly string[]>
  implements IQueryHandler<ListUserPermissionsQuery>
{
  readonly queryType = 'user.list-permissions';

  constructor(@Inject('AuthPermissionRepository') private readonly permissionRepo: AuthPermissionRepository) {
    super();
  }

  async execute(_query: ListUserPermissionsQuery): Promise<readonly string[]> {
    const entities = await this.permissionRepo.findAll();
    return entities.map((e) => e.name.value);
  }
}
