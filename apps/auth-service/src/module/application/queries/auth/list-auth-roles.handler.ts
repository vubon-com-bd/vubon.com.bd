import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListAuthRolesQuery } from './list-auth-roles.query';
import type { AuthRoleRepository } from '../../../domain/repositories/auth-role.repository.interface';

@QueryHandler(ListAuthRolesQuery)
export class ListAuthRolesHandler
  extends BaseQueryHandler<ListAuthRolesQuery, readonly string[]>
  implements IQueryHandler<ListAuthRolesQuery>
{
  readonly queryType = 'auth.list-roles';

  constructor(@Inject('AuthRoleRepository') private readonly roleRepo: AuthRoleRepository) {
    super();
  }

  async execute(_query: ListAuthRolesQuery): Promise<readonly string[]> {
    const entities = await this.roleRepo.findAll();
    return entities.map((e) => e.name.value);
  }
}
