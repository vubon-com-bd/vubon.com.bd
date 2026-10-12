import {
  UpdateProfileRequestSchema,
  UpdateSettingsRequestSchema,
  UpdatePreferencesRequestSchema,
} from '@vubon/shared-schemas/user';

export class ProfileValidator {
  static validateProfile(input: unknown) { return UpdateProfileRequestSchema.parse(input); }
  static validateSettings(input: unknown) { return UpdateSettingsRequestSchema.parse(input); }
  static validatePreferences(input: unknown) { return UpdatePreferencesRequestSchema.parse(input); }
}
