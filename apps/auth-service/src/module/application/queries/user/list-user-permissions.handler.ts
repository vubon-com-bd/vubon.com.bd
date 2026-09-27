import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListUserPermissionsQuery } from './list-user-permissions.query.js';
import type { UserPermissionServiceInterface } from '../../services/interfaces/user-permission.service.interface.js';
import type { UserPermissionResponseDTO } from '../../dtos/responses/user-permission-response.dto.js';
import { USER_PERMISSION_SERVICE } from '../../tokens.js';

@QueryHandler(ListUserPermissionsQuery)
export class ListUserPermissionsHandler
  extends BaseQueryHandler<ListUserPermissionsQuery, UserPermissionResponseDTO>
  implements IQueryHandler<ListUserPermissionsQuery> {
  readonly queryType = 'ListUserPermissionsQuery';
  constructor(
    @Inject(USER_PERMISSION_SERVICE)
    private readonly permissionService: UserPermissionServiceInterface,
  ) { super(); }

  async execute(
    query: ListUserPermissionsQuery,
  ): Promise<UserPermissionResponseDTO> {
    return this.permissionService.effectivePermissions(query.userId);
  }
}
