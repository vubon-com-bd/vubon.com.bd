/**
 * UserControllerMapper — Application UserResponseDTO → Interface UserResponseDTO
 * @module auth-service/interfaces/mappers
 */
import { Injectable } from '@nestjs/common';
import type { UserResponseDTO as AppUserResponse } from '../../application/dtos/responses/user-response.dto';
import type { UserResponseDTO } from '../dtos/responses/user.response.dto';

@Injectable()
export class UserControllerMapper {
  toResponse(source: AppUserResponse): UserResponseDTO {
    return {
      id: source.id,
      email: source.email,
      phone: source.phone,
      name: source.name,
      status: source.status,
      type: source.type,
      roles: [...source.roles],
      emailVerified: source.emailVerified,
      phoneVerified: source.phoneVerified,
      mfaEnabled: source.mfaEnabled,
      createdAt: source.createdAt,
      updatedAt: source.updatedAt,
    };
  }

  toResponseList(
    sources: readonly AppUserResponse[],
  ): readonly UserResponseDTO[] {
    return sources.map((s) => this.toResponse(s));
  }
}
