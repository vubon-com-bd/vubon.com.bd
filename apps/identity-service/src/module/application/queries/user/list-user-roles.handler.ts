import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListUserRolesQuery } from './list-user-roles.query.js';
import type { UserRoleResponseDTO } from '../../dtos/responses/user-role-response.dto.js';
import type { UserRoleServiceInterface } from '../../services/interfaces/user-role.service.interface.js';
import { USER_ROLE_SERVICE } from '../../services/interfaces/user-role.service.interface.js';

@QueryHandler(ListUserRolesQuery)
export class ListUserRolesHandler
  extends BaseQueryHandler<ListUserRolesQuery, readonly UserRoleResponseDTO[]>
  implements IQueryHandler<ListUserRolesQuery>
{
  readonly queryType = 'user.list-roles';
  constructor(@Inject(USER_ROLE_SERVICE) private readonly service: UserRoleServiceInterface) { super(); }
  async execute(q: ListUserRolesQuery): Promise<readonly UserRoleResponseDTO[]> { return this.service.listForUser(q.userId); }
}
