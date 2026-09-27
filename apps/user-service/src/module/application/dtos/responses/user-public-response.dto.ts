/**
 * UserPublicResponseDTO — sensitive field বাদ
 */
import type { UserStatusValue, UserTypeValue } from '@vubon/shared-types/user';

export interface UserPublicResponseDTO {
  readonly id: string;
  readonly username?: string;
  readonly displayName?: string;
  readonly avatarUrl?: string;
  readonly status: UserStatusValue;
  readonly type: UserTypeValue;
}
