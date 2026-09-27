/**
 * UpdateUserRequestDTO
 */
import type { UpdateUserRequestSchemaType } from '@vubon/shared-schemas/user';

export interface UpdateUserRequestDTO {
  readonly username?: string;
  readonly phone?: string;
  readonly status?: string;
  readonly type?: string;
  readonly roles?: readonly string[];
  readonly emailVerified?: boolean;
  readonly phoneVerified?: boolean;
  readonly isMfaEnabled?: boolean;
}

export type UpdateUserRequestInput = UpdateUserRequestSchemaType;
