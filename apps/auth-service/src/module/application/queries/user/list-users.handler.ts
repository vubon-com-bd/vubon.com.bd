import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListUsersQuery } from './list-users.query';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface';
import type { UserResponseDTO } from '../../dtos/responses/user-response.dto';

@QueryHandler(ListUsersQuery)
export class ListUsersHandler
  extends BaseQueryHandler<ListUsersQuery, readonly UserResponseDTO[]>
  implements IQueryHandler<ListUsersQuery>
{
  readonly queryType = 'user.list';

  constructor(private readonly userRepo: UserRepository) {
    super();
  }

  async execute(query: ListUsersQuery): Promise<readonly UserResponseDTO[]> {
    void query;
    const entities = await this.userRepo.findAll();
    return entities.map((entity) => ({
      success: true,
      user: {
        id: entity.id.value,
        email: entity.email.value,
        type: entity.type.value,
        status: entity.status.value,
        roles: [entity.role.value],
        isMfaEnabled: false,
        emailVerified: entity.emailVerified,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
        deletedAt: entity.deletedAt ?? undefined,
      },
    }));
  }
}
