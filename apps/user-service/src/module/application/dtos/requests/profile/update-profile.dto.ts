/**
 * UpdateProfileRequestDTO
 */
import type { UpdateProfileRequestSchemaType } from '@vubon/shared-schemas/user';

export interface UpdateProfileRequestDTO {
  readonly userId: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly displayName?: string;
  readonly bio?: string;
  readonly avatarUrl?: string;
  readonly coverUrl?: string;
  readonly gender?: string;
  readonly dateOfBirth?: string;
  readonly website?: string;
  readonly company?: string;
  readonly designation?: string;
  readonly visibility?: string;
}

export type UpdateProfileRequestInput = UpdateProfileRequestSchemaType;
