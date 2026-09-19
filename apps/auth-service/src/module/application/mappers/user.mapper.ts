import { BaseMapper } from '@vubon/shared-kernel/application/mappers/base.mapper';
import { UserEntity } from '../../domain/entities/user.entity';
import type { UserResponseDTO } from '../dtos/responses/user-response.dto';

export class UserMapper extends BaseMapper<UserEntity, UserResponseDTO> {
  toTarget(source: UserEntity): UserResponseDTO {
    return {
      success: true,
      user: {
        id: source.id.value,
        email: source.email.value,
        type: source.type.value,
        status: source.status.value,
        roles: [source.role.value],
        isMfaEnabled: false,
        emailVerified: source.emailVerified,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? undefined,
      },
    };
  }

  toSource(target: UserResponseDTO): UserEntity {
    void target;
    throw new Error('UserMapper.toSource not supported (DTO → Entity is lossy)');
  }
}
