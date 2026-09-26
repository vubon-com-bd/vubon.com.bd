import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListUserRolesQuery } from './list-user-roles.query';
import type { UserRoleServiceInterface } from '../../services/interfaces/user-role.service.interface';
import type { UserRoleResponseDTO } from '../../dtos/responses/user-role-response.dto';
import { USER_ROLE_SERVICE } from '../../tokens';

@QueryHandler(ListUserRolesQuery)
export class ListUserRolesHandler
  extends BaseQueryHandler<ListUserRolesQuery, readonly UserRoleResponseDTO[]>
  implements IQueryHandler<ListUserRolesQuery> {
  readonly queryType = 'ListUserRolesQuery';
  constructor(
    @Inject(USER_ROLE_SERVICE)
    private readonly userRoleService: UserRoleServiceInterface,
  ) { super(); }

  async execute(
    query: ListUserRolesQuery,
  ): Promise<readonly UserRoleResponseDTO[]> {
    const roles = await this.userRoleService.listForUser(query.userId);
    return roles.map((r) => this.userRoleService.toResponse(r));
  }
}
