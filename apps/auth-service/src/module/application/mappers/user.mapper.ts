/**
 * UserMapper — UserEntity → UserResponseDTO
 * @module auth-service/application/mappers
 */
import { BaseMapper } from '@vubon/shared-kernel/application/mappers/base.mapper';
import { UserEntity } from '../../domain/entities/user.entity';
import type { UserResponseDTO } from '../dtos/responses/user-response.dto';

export class UserMapper extends BaseMapper<UserEntity, UserResponseDTO> {
  toTarget(entity: UserEntity): UserResponseDTO {
    return {
      id: entity.id,
      email: entity.email.value,
      phone: entity.phone?.value,
      name: entity.name.value,
      status: entity.status.value as
        | 'active' | 'inactive' | 'suspended' | 'pending' | 'deleted',
      type: entity.type.value,
      roles: entity.roles.map((r) => r.value),
      emailVerified: entity.emailVerified,
      phoneVerified: entity.phoneVerified,
      mfaEnabled: false,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  toSource(dto: UserResponseDTO): UserEntity {
    throw new Error(
      'UserMapper.toSource is intentionally not implemented — mappers are one-way for entities.',
    );
    void dto;
  }
}
