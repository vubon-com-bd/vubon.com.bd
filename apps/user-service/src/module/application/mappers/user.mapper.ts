import { UserEntity } from '../../domain/entities/user.entity';
import type { UserResponseDTO } from '../dtos/responses/user-response.dto';
import type { UserPublicResponseDTO } from '../dtos/responses/user-public-response.dto';

export class UserMapper {
  static toResponse(user: UserEntity): UserResponseDTO {
    return {
      success: true,
      user: {
        id: user.id.value,
        email: user.email.value,
        type: user.type.value,
        status: user.status.value,
        roles: [],
        isMfaEnabled: false,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt ?? undefined,
      },
    } as unknown as UserResponseDTO;
  }

  static toPublicResponse(user: UserEntity): UserPublicResponseDTO {
    return {
      id: user.id.value,
      name: user.name.value,
      type: user.type.value,
      status: user.status.value,
      createdAt: user.createdAt,
    } as unknown as UserPublicResponseDTO;
  }

  static toListResponse(users: readonly UserEntity[]): readonly UserResponseDTO[] {
    return users.map((u) => UserMapper.toResponse(u));
  }
}
