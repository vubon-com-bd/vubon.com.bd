/**
 * UserControllerMapper — Interface DTO ↔ Application DTO
 * @module user-service/interfaces/mappers
 */
import type {
  CreateUserRequestDto,
  UpdateUserRequestDto,
} from '../dtos/requests/user.request.dto.js';
import {
  UserResponseDto,
  UserListResponseDto,
} from '../dtos/responses/user.response.dto.js';
import { PublicUserResponseDto } from '../dtos/responses/public-user.response.dto.js';
import type { CreateUserRequestDTO } from '@application/dtos/requests/user';
import type { UpdateUserRequestDTO } from '@application/dtos/requests/user';
import type { UserResponseDTO } from '@application/dtos/responses/user-response.dto';
import type { UserPublicResponseDTO } from '@application/dtos/responses/user-public-response.dto';

export class UserControllerMapper {
  static toCreateAppDto(dto: CreateUserRequestDto): CreateUserRequestDTO {
    return {
      email: dto.email,
      password: dto.password,
      type: dto.type as never,
      phone: dto.phone,
      username: dto.username,
      firstName: dto.firstName,
      lastName: dto.lastName,
      sendVerificationEmail: dto.sendVerificationEmail,
      acceptTerms: true,
    };
  }

  static toUpdateAppDto(dto: UpdateUserRequestDto): UpdateUserRequestDTO {
    return {
      username: dto.username,
      phone: dto.phone,
      status: dto.status,
      type: dto.type,
    };
  }

  static toResponse(app: UserResponseDTO): UserResponseDto {
    const res = new UserResponseDto();
    res.id = app.id;
    res.email = app.email;
    res.username = app.username;
    res.phone = app.phone;
    res.status = app.status;
    res.type = app.type;
    res.roles = app.roles;
    res.emailVerified = app.emailVerified;
    res.phoneVerified = app.phoneVerified;
    res.isMfaEnabled = app.isMfaEnabled;
    res.lastLoginAt = app.lastLoginAt;
    res.lastActiveAt = app.lastActiveAt;
    res.createdAt = app.createdAt;
    res.updatedAt = app.updatedAt;
    return res;
  }

  static toResponseList(apps: readonly UserResponseDTO[]): readonly UserResponseDto[] {
    return apps.map((a) => UserControllerMapper.toResponse(a));
  }

  static toPublicResponse(app: UserPublicResponseDTO): PublicUserResponseDto {
    const res = new PublicUserResponseDto();
    res.id = app.id;
    res.username = app.username;
    res.displayName = app.displayName;
    res.avatarUrl = app.avatarUrl;
    res.status = app.status;
    res.type = app.type;
    return res;
  }

  static toListResponse(
    items: readonly UserResponseDTO[],
    total: number,
    page: number,
    limit: number,
    totalPages: number
  ): UserListResponseDto {
    const res = new UserListResponseDto();
    res.items = UserControllerMapper.toResponseList(items);
    res.total = total;
    res.page = page;
    res.limit = limit;
    res.totalPages = totalPages;
    return res;
  }
}
