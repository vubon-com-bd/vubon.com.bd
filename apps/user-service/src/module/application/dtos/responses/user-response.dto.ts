/**
 * UserResponseDTO
 */
import type { UserStatusValue, UserTypeValue } from '@vubon/shared-types/user';

export interface UserResponseDTO {
  readonly id: string;
  readonly email: string;
  readonly username?: string;
  readonly phone?: string;
  readonly status: UserStatusValue;
  readonly type: UserTypeValue;
  readonly roles: readonly string[];
  readonly emailVerified: boolean;
  readonly phoneVerified: boolean;
  readonly isMfaEnabled: boolean;
  readonly lastLoginAt?: string;
  readonly lastActiveAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
