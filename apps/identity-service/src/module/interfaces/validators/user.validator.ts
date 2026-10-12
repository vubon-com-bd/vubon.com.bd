/**
 * UserHttpValidator
 * @module identity-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';
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

function throwBadRequest(
  schemaName: string,
  issues: readonly { path: readonly (string | number)[]; message: string }[],
): never {
  throw new BadRequestException({
    statusCode: 400,
    code: 'VAL_REQUIRED',
    message: `${schemaName} validation failed`,
    details: issues.map((i) => ({
      field: i.path.join('.'),
      message: i.message,
    })),
  });
}

export class UserHttpValidator {
  static validateCreate(body: unknown): void {
    const result = CreateUserRequestSchema.safeParse(body);
    if (!result.success) throwBadRequest('Create User', result.error.issues);
  }

  static validateUpdate(body: unknown): void {
    const result = UpdateUserRequestSchema.safeParse(body);
    if (!result.success) throwBadRequest('Update User', result.error.issues);
  }

  static validateProfile(body: unknown): void {
    const result = UpdateProfileRequestSchema.safeParse(body);
    if (!result.success) throwBadRequest('Update Profile', result.error.issues);
  }

  static validateSettings(body: unknown): void {
    const result = UpdateSettingsRequestSchema.safeParse(body);
    if (!result.success) throwBadRequest('Update Settings', result.error.issues);
  }

  static validatePreferences(body: unknown): void {
    const result = UpdatePreferencesRequestSchema.safeParse(body);
    if (!result.success) throwBadRequest('Update Preferences', result.error.issues);
  }

  static validateAddAddress(body: unknown): void {
    const result = AddAddressRequestSchema.safeParse(body);
    if (!result.success) throwBadRequest('Add Address', result.error.issues);
  }

  static validateUpdateAddress(body: unknown): void {
    const result = UpdateAddressRequestSchema.safeParse(body);
    if (!result.success) throwBadRequest('Update Address', result.error.issues);
  }

  static validateAddContact(body: unknown): void {
    const result = AddContactRequestSchema.safeParse(body);
    if (!result.success) throwBadRequest('Add Contact', result.error.issues);
  }

  static validateSubmitKyc(body: unknown): void {
    const result = SubmitKycRequestSchema.safeParse(body);
    if (!result.success) throwBadRequest('Submit KYC', result.error.issues);
  }
}
