/**
 * CreateUserRequestDTO
 * @module user-service/application/dtos/requests/user
 */
import type { CreateUserRequestSchemaType } from '@vubon/shared-schemas/user';
import type { UserTypeValue, UserRoleValue } from '@vubon/shared-types/user';

export interface CreateUserRequestDTO {
  readonly email: string;
  readonly password: string;
  readonly type: UserTypeValue;
  readonly phone?: string;
  readonly username?: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly role?: UserRoleValue;
  readonly sendVerificationEmail?: boolean;
  readonly acceptTerms: true;
}

export type CreateUserRequestInput = CreateUserRequestSchemaType;
