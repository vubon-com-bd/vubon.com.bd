/**
 * ProfileValidator
 */
import { UpdateProfileRequestSchema } from '@vubon/shared-schemas/user';
import { USER_PROFILE } from '@vubon/shared-constants/user';
import type { UpdateProfileRequestDTO } from '../dtos/requests/profile/index.js';

export interface ProfileValidationResult {
  readonly success: boolean;
  readonly data?: UpdateProfileRequestDTO;
  readonly errors?: readonly string[];
}

export class ProfileValidator {
  static validateUpdate(input: unknown): ProfileValidationResult {
    const result = UpdateProfileRequestSchema.safeParse(input);
    if (!result.success) {
      return {
        success: false,
        errors: result.error.issues.map(
          (issue) => `${issue.path.join('.')}: ${issue.message}`
        ),
      };
    }
    return { success: true, data: result.data as UpdateProfileRequestDTO };
  }

  static validateBio(bio: string): ProfileValidationResult {
    if (typeof bio !== 'string') {
      return { success: false, errors: ['bio: must be a string'] };
    }
    if (bio.trim().length > USER_PROFILE.BIO_MAX_LENGTH) {
      return {
        success: false,
        errors: [`bio: exceeds max length (${USER_PROFILE.BIO_MAX_LENGTH})`],
      };
    }
    return { success: true, data: { userId: '', bio } };
  }

  static validateAvatarUrl(url: string): ProfileValidationResult {
    if (typeof url !== 'string') {
      return { success: false, errors: ['avatarUrl: must be a string'] };
    }
    try {
      new URL(url);
    } catch {
      return { success: false, errors: ['avatarUrl: invalid URL'] };
    }
    return { success: true, data: { userId: '', avatarUrl: url } };
  }

  static assertValidUpdate(input: unknown): UpdateProfileRequestDTO {
    const result = ProfileValidator.validateUpdate(input);
    if (!result.success || !result.data) {
      throw new Error(
        `Invalid profile update input: ${(result.errors ?? []).join('; ')}`
      );
    }
    return result.data;
  }
}
