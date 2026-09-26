import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListAuthRolesQuery } from './list-auth-roles.query';
import type { AuthRoleRepository } from '../../../domain/repositories/auth-role.repository.interface';
import type { UserRoleResponseDTO } from '../../dtos/responses/user-role-response.dto';
import { AUTH_ROLE_REPO } from '../../tokens';

@QueryHandler(ListAuthRolesQuery)
export class ListAuthRolesHandler
  extends BaseQueryHandler<ListAuthRolesQuery, readonly UserRoleResponseDTO[]>
  implements IQueryHandler<ListAuthRolesQuery> {
  readonly queryType = 'ListAuthRolesQuery';
  constructor(
    @Inject(AUTH_ROLE_REPO) private readonly repo: AuthRoleRepository,
  ) { super(); }

  async execute(_query: ListAuthRolesQuery): Promise<readonly UserRoleResponseDTO[]> {
    const rows = await this.repo.findAll();
    return rows.map((r) => ({
      id: r.id,
      name: r.name.value,
      description: r.description.value,
      permissions: r.permissions.map((p) => p.value),
      isSystem: r.isSystem,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    }));
  }
}
