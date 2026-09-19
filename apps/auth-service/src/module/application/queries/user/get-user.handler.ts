import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetUserQuery } from './get-user.query';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface';
import type { UserResponseDTO } from '../../dtos/responses/user-response.dto';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { UserOperationFailedError } from '../../errors/user.errors';

@QueryHandler(GetUserQuery)
export class GetUserHandler
  extends BaseQueryHandler<GetUserQuery, UserResponseDTO>
  implements IQueryHandler<GetUserQuery>
{
  readonly queryType = 'user.get';

  constructor(private readonly userRepo: UserRepository) {
    super();
  }

  async execute(query: GetUserQuery): Promise<UserResponseDTO> {
    const entity = await this.userRepo.findById(UserIdVO.create(query.userId));
    if (!entity) {
      throw new UserOperationFailedError(`user not found: ${query.userId}`);
    }
    return {
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
    };
  }
}
