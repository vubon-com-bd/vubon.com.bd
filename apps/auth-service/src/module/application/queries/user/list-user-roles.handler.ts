import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListUserRolesQuery } from './list-user-roles.query';
import type { AuthRoleRepository } from '../../../domain/repositories/auth-role.repository.interface';

@QueryHandler(ListUserRolesQuery)
export class ListUserRolesHandler
  extends BaseQueryHandler<ListUserRolesQuery, readonly string[]>
  implements IQueryHandler<ListUserRolesQuery>
{
  readonly queryType = 'user.list-roles';

  constructor(@Inject('AuthRoleRepository') private readonly roleRepo: AuthRoleRepository) {
    super();
  }

  async execute(_query: ListUserRolesQuery): Promise<readonly string[]> {
    const entities = await this.roleRepo.findAll();
    return entities.map((e) => e.name.value);
  }
}
