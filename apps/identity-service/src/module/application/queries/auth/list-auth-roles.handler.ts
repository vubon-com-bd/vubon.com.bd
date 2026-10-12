import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListAuthRolesQuery } from './list-auth-roles.query.js';
import type { RoleEntity } from '../../../domain/entities/role.entity.js';
import type { AuthRoleServiceInterface } from '../../services/interfaces/auth-role.service.interface.js';
import { AUTH_ROLE_SERVICE } from '../../services/interfaces/auth-role.service.interface.js';

@QueryHandler(ListAuthRolesQuery)
export class ListAuthRolesHandler
  extends BaseQueryHandler<ListAuthRolesQuery, readonly RoleEntity[]>
  implements IQueryHandler<ListAuthRolesQuery>
{
  readonly queryType = 'auth.list-roles';
  constructor(@Inject(AUTH_ROLE_SERVICE) private readonly service: AuthRoleServiceInterface) { super(); }

  async execute(_query: ListAuthRolesQuery): Promise<readonly RoleEntity[]> {
    return this.service.listAll();
  }
}
