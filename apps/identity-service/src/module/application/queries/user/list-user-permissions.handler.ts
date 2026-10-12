import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListUserPermissionsQuery } from './list-user-permissions.query.js';
import type { UserPermissionResponseDTO } from '../../dtos/responses/user-permission-response.dto.js';
import type { UserPermissionServiceInterface } from '../../services/interfaces/user-permission.service.interface.js';
import { USER_PERMISSION_SERVICE } from '../../services/interfaces/user-permission.service.interface.js';

@QueryHandler(ListUserPermissionsQuery)
export class ListUserPermissionsHandler
  extends BaseQueryHandler<ListUserPermissionsQuery, readonly UserPermissionResponseDTO[]>
  implements IQueryHandler<ListUserPermissionsQuery>
{
  readonly queryType = 'user.list-permissions';
  constructor(@Inject(USER_PERMISSION_SERVICE) private readonly service: UserPermissionServiceInterface) { super(); }
  async execute(q: ListUserPermissionsQuery): Promise<readonly UserPermissionResponseDTO[]> { return this.service.listForUser(q.userId); }
}
