import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListAuthPermissionsQuery } from './list-auth-permissions.query';
import type { AuthPermissionRepository } from '../../../domain/repositories/auth-permission.repository.interface';
import { AUTH_PERMISSION_REPO } from '../../tokens';

export interface AuthPermissionDTO {
  readonly id: string;
  readonly name: string;
  readonly resource: string;
  readonly action: string;
  readonly description?: string;
}

@QueryHandler(ListAuthPermissionsQuery)
export class ListAuthPermissionsHandler
  extends BaseQueryHandler<ListAuthPermissionsQuery, readonly AuthPermissionDTO[]>
  implements IQueryHandler<ListAuthPermissionsQuery> {
  readonly queryType = 'ListAuthPermissionsQuery';
  constructor(
    @Inject(AUTH_PERMISSION_REPO)
    private readonly repo: AuthPermissionRepository,
  ) { super(); }

  async execute(
    query: ListAuthPermissionsQuery,
  ): Promise<readonly AuthPermissionDTO[]> {
    const rows = query.resource
      ? await this.repo.findByResource(query.resource)
      : await this.repo.findAll();
    return rows.map((p) => ({
      id: p.id,
      name: p.name.value,
      resource: p.resource.value,
      action: p.action.value,
      description: p.description,
    }));
  }
}
