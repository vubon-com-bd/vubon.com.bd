import { Injectable } from '@nestjs/common';
import type { UserResponseDTO } from '../../application/dtos/responses/user-response.dto';
import type { UserResponseDto } from '../dtos/responses/user.response.dto';

@Injectable()
export class UserControllerMapper {
  toResponse(appDto: UserResponseDTO): UserResponseDto {
    const u = appDto.user;
    return {
      id: u.id,
      email: u.email,
      name: (u as unknown as { name?: string }).name ?? '',
      type: u.type,
      status: u.status,
      emailVerified: u.emailVerified,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt,
    };
  }
}
