import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListAuthPermissionsQuery } from './list-auth-permissions.query.js';
import type { PermissionEntity } from '../../../domain/entities/permission.entity.js';
import type { AuthPermissionServiceInterface } from '../../services/interfaces/auth-permission.service.interface.js';
import { AUTH_PERMISSION_SERVICE } from '../../services/interfaces/auth-permission.service.interface.js';

@QueryHandler(ListAuthPermissionsQuery)
export class ListAuthPermissionsHandler
  extends BaseQueryHandler<ListAuthPermissionsQuery, readonly PermissionEntity[]>
  implements IQueryHandler<ListAuthPermissionsQuery>
{
  readonly queryType = 'auth.list-permissions';
  constructor(@Inject(AUTH_PERMISSION_SERVICE) private readonly service: AuthPermissionServiceInterface) { super(); }

  async execute(_query: ListAuthPermissionsQuery): Promise<readonly PermissionEntity[]> {
    return this.service.listAll();
  }
}
