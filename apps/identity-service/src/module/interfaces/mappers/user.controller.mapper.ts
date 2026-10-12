/**
 * UserControllerMapper
 * @module identity-service/interfaces/mappers
 */
import type { CreateUserHttpDTO } from '../dtos/requests/user/create-user.request.dto.js';
import type { UpdateUserHttpDTO } from '../dtos/requests/user/update-user.request.dto.js';
import type { DeleteUserHttpDTO } from '../dtos/requests/user/delete-user.request.dto.js';
import type { ActivateUserHttpDTO } from '../dtos/requests/user/activate-user.request.dto.js';
import type { DeactivateUserHttpDTO } from '../dtos/requests/user/deactivate-user.request.dto.js';
import type { SuspendUserHttpDTO } from '../dtos/requests/user/suspend-user.request.dto.js';
import type { UnsuspendUserHttpDTO } from '../dtos/requests/user/unsuspend-user.request.dto.js';
import type { UserResponseDTO } from '../../application/dtos/responses/user-response.dto.js';
import type { UserHttpResponseDTO } from '../dtos/responses/user/user.response.dto.js';
import type { UserPublicHttpResponseDTO } from '../dtos/responses/user/user-public.response.dto.js';

/**
 * UserResponseDTO = wrapper { success, user: UserPublic }
 * Extract inner user with safe optional access.
 */
interface SafeUser {
  readonly id: string;
  readonly email: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly username?: string;
  readonly status: string;
  readonly type: string;
  readonly roles?: readonly string[];
  readonly emailVerified: boolean;
  readonly phoneVerified?: boolean;
  readonly isMfaEnabled?: boolean;
  readonly lastLoginAt?: string;
  readonly createdAt: string;
  readonly updatedAt?: string;
}

export class UserControllerMapper {
  // ═══ HTTP → App ═══
  static toCreateAppDto(dto: CreateUserHttpDTO): unknown {
    return {
      email: dto.email,
      phone: dto.phone,
      username: dto.username,
      password: dto.password,
      firstName: dto.firstName,
      lastName: dto.lastName,
      type: dto.type,
      role: dto.role,
      sendVerificationEmail: dto.sendVerificationEmail ?? true,
      acceptTerms: dto.acceptTerms,
    };
  }

  static toUpdateAppDto(dto: UpdateUserHttpDTO): unknown {
    return { ...dto };
  }

  static toDeleteAppDto(dto: DeleteUserHttpDTO): unknown {
    return {
      userId: dto.userId,
      reason: dto.reason,
      hardDelete: dto.hardDelete ?? false,
    };
  }

  static toActivateAppDto(dto: ActivateUserHttpDTO): { userId: string; reason?: string } {
    return { userId: dto.userId, reason: dto.reason };
  }

  static toDeactivateAppDto(dto: DeactivateUserHttpDTO): { userId: string; reason?: string } {
    return { userId: dto.userId, reason: dto.reason };
  }

  static toSuspendAppDto(dto: SuspendUserHttpDTO): unknown {
    return {
      userId: dto.userId,
      reason: dto.reason,
      durationSeconds: dto.durationSeconds,
    };
  }

  static toUnsuspendAppDto(dto: UnsuspendUserHttpDTO): { userId: string } {
    return { userId: dto.userId };
  }

  // ═══ Helpers ═══
  private static extractUser(app: UserResponseDTO): SafeUser {
    const wrapper = app as unknown as { user?: SafeUser } & Partial<SafeUser>;
    return (wrapper.user ?? (app as unknown as SafeUser)) as SafeUser;
  }

  // ═══ App → HTTP ═══
  static toHttpResponse(app: UserResponseDTO): UserHttpResponseDTO {
    const u = this.extractUser(app);
    return {
      id: u.id,
      email: u.email,
      firstName: u.firstName,
      lastName: u.lastName,
      username: u.username,
      status: u.status,
      type: u.type,
      roles: u.roles ?? [],
      emailVerified: u.emailVerified,
      phoneVerified: u.phoneVerified ?? false,
      isMfaEnabled: u.isMfaEnabled ?? false,
      lastLoginAt: u.lastLoginAt,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt ?? u.createdAt,
    };
  }

  static toPublicHttpResponse(app: UserResponseDTO): UserPublicHttpResponseDTO {
    const u = this.extractUser(app);
    return {
      id: u.id,
      email: u.email,
      firstName: u.firstName,
      lastName: u.lastName,
      username: u.username,
      status: u.status,
      type: u.type,
      roles: u.roles ?? [],
      emailVerified: u.emailVerified,
      phoneVerified: u.phoneVerified ?? false,
      isMfaEnabled: u.isMfaEnabled ?? false,
      createdAt: u.createdAt,
    };
  }
}
