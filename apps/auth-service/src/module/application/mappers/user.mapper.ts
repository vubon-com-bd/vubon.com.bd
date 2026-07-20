/**
 * User mapper
 * Maps between domain User entity and application DTOs
 */
import type { User } from '../../domain/entities/user.entity';
import type {
  LoginResponseDto,
  RegisterResponseDto,
  UpdateProfileResponseDto,
  UserActivityDto,
  UserSessionDto,
} from '../dtos/auth/register.dto';

export class UserMapper {
  /**
   * Map User entity to RegisterResponseDto
   */
  public static toRegisterResponse(
    user: User,
    requiresVerification: boolean,
    verificationToken?: string,
  ): RegisterResponseDto {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      status: user.status,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
      requiresVerification,
      verificationToken,
    };
  }

  /**
   * Map User entity to LoginResponseDto user object
   */
  public static toLoginUserResponse(user: User): LoginResponseDto['user'] {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      status: user.status,
      isVerified: user.isVerified,
      isActive: user.isActive,
      lastLoginAt: user.lastLoginAt,
    };
  }

  /**
   * Map User entity to LoginResponseDto
   */
  public static toLoginResponse(
    user: User,
    accessToken: string,
    refreshToken: string,
    sessionId: string,
    expiresIn: number,
  ): LoginResponseDto {
    return {
      user: this.toLoginUserResponse(user),
      accessToken,
      refreshToken,
      sessionId,
      expiresIn,
    };
  }

  /**
   * Map User entity to UpdateProfileResponseDto
   */
  public static toUpdateProfileResponse(user: User): UpdateProfileResponseDto {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: null, // Phone number not in User entity yet
      role: user.role,
      updatedAt: user.updatedAt,
    };
  }

  /**
   * Map User entity to a public user response (without sensitive data)
   */
  public static toPublicUserResponse(user: User): PublicUserResponse {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName,
      role: user.role,
      status: user.status,
      isVerified: user.isVerified,
      isActive: user.isActive,
      lastLoginAt: user.lastLoginAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  /**
   * Map User entity to a minimal user response
   */
  public static toMinimalUserResponse(user: User): MinimalUserResponse {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      fullName: user.fullName,
    };
  }

  /**
   * Map User entity to a user profile response
   */
  public static toUserProfileResponse(user: User): UserProfileResponse {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName,
      role: user.role,
      status: user.status,
      isVerified: user.isVerified,
      isActive: user.isActive,
      lastLoginAt: user.lastLoginAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  /**
   * Map User entity to a user with sensitive data (for internal use)
   */
  public static toInternalUserResponse(user: User): InternalUserResponse {
    return {
      ...this.toPublicUserResponse(user),
      passwordHash: user.passwordHash,
      salt: user.salt,
      loginAttempts: user.loginAttempts,
      lockedUntil: user.lockedUntil,
      verificationToken: user.verificationToken,
      verificationTokenExpiresAt: user.verificationTokenExpiresAt,
      passwordResetToken: user.passwordResetToken,
      passwordResetTokenExpiresAt: user.passwordResetTokenExpiresAt,
      refreshToken: user.refreshToken,
      refreshTokenExpiresAt: user.refreshTokenExpiresAt,
    };
  }

  /**
   * Map User entity to user session DTO
   */
  public static toUserSessionDto(session: UserSessionDto): UserSessionDto {
    return {
      id: session.id,
      userId: session.userId,
      sessionId: session.sessionId,
      ipAddress: session.ipAddress,
      userAgent: session.userAgent,
      deviceType: session.deviceType,
      browser: session.browser,
      operatingSystem: session.operatingSystem,
      isActive: session.isActive,
      lastActivityAt: session.lastActivityAt,
      expiresAt: session.expiresAt,
      createdAt: session.createdAt,
    };
  }

  /**
   * Map User entity to user activity DTO
   */
  public static toUserActivityDto(activity: UserActivityDto): UserActivityDto {
    return {
      id: activity.id,
      userId: activity.userId,
      action: activity.action,
      resource: activity.resource,
      resourceId: activity.resourceId,
      metadata: activity.metadata,
      ipAddress: activity.ipAddress,
      userAgent: activity.userAgent,
      createdAt: activity.createdAt,
    };
  }

  /**
   * Map multiple User entities to public responses
   */
  public static toPublicUserResponseList(users: User[]): PublicUserResponse[] {
    return users.map((user) => this.toPublicUserResponse(user));
  }

  /**
   * Map multiple User entities to minimal responses
   */
  public static toMinimalUserResponseList(users: User[]): MinimalUserResponse[] {
    return users.map((user) => this.toMinimalUserResponse(user));
  }
}

export interface PublicUserResponse {
  id: string;
  email: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  fullName: string;
  role: string;
  status: string;
  isVerified: boolean;
  isActive: boolean;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface MinimalUserResponse {
  id: string;
  email: string;
  username: string;
  fullName: string;
}

export interface UserProfileResponse {
  id: string;
  email: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  fullName: string;
  role: string;
  status: string;
  isVerified: boolean;
  isActive: boolean;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface InternalUserResponse extends PublicUserResponse {
  passwordHash: string;
  salt: string;
  loginAttempts: number;
  lockedUntil: Date | null;
  verificationToken: string | null;
  verificationTokenExpiresAt: Date | null;
  passwordResetToken: string | null;
  passwordResetTokenExpiresAt: Date | null;
  refreshToken: string | null;
  refreshTokenExpiresAt: Date | null;
}

export class UserMapperFactory {
  public static create(): UserMapper {
    return new UserMapper();
  }
}
