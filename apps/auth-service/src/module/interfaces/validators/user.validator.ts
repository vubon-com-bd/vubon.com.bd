/**
 * UserValidator
 * @module auth-service/interfaces/validators
 */
import {
  CreateUserRequestSchema,
  UpdateUserRequestSchema,
  UpdateProfileRequestSchema,
  UpdateSettingsRequestSchema,
  UpdatePreferencesRequestSchema,
  AddAddressRequestSchema,
  UpdateAddressRequestSchema,
  AddContactRequestSchema,
  SubmitKycRequestSchema,
} from '@vubon/shared-schemas/user';
import { PasswordChangeInputSchema } from '@vubon/shared-schemas/auth';
import type { z } from 'zod';

export class UserValidator {
  static create(input: unknown): z.infer<typeof CreateUserRequestSchema> {
    return CreateUserRequestSchema.parse(input);
  }

  static update(input: unknown): z.infer<typeof UpdateUserRequestSchema> {
    return UpdateUserRequestSchema.parse(input);
  }

  static updateProfile(
    input: unknown,
  ): z.infer<typeof UpdateProfileRequestSchema> {
    return UpdateProfileRequestSchema.parse(input);
  }

  static updateSettings(
    input: unknown,
  ): z.infer<typeof UpdateSettingsRequestSchema> {
    return UpdateSettingsRequestSchema.parse(input);
  }

  static updatePreferences(
    input: unknown,
  ): z.infer<typeof UpdatePreferencesRequestSchema> {
    return UpdatePreferencesRequestSchema.parse(input);
  }

  static addAddress(
    input: unknown,
  ): z.infer<typeof AddAddressRequestSchema> {
    return AddAddressRequestSchema.parse(input);
  }

  static updateAddress(
    input: unknown,
  ): z.infer<typeof UpdateAddressRequestSchema> {
    return UpdateAddressRequestSchema.parse(input);
  }

  static addContact(
    input: unknown,
  ): z.infer<typeof AddContactRequestSchema> {
    return AddContactRequestSchema.parse(input);
  }

  static submitKyc(input: unknown): z.infer<typeof SubmitKycRequestSchema> {
    return SubmitKycRequestSchema.parse(input);
  }

  static changePassword(
    input: unknown,
  ): z.infer<typeof PasswordChangeInputSchema> {
    return PasswordChangeInputSchema.parse(input);
  }
}
