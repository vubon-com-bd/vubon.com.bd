/**
 * Profile Validator
 */
import { UpdateProfileRequestSchema } from '@vubon/shared-schemas/user';
import { USER_PROFILE } from '@vubon/shared-constants/user';

export interface ProfileValidationResult<T> {
  readonly success: boolean;
  readonly data?: T;
  readonly errors?: readonly string[];
}

export class ProfileValidator {
  static validateUpdate(input: unknown): ProfileValidationResult<unknown> {
    const result = UpdateProfileRequestSchema.safeParse(input);
    if (!result.success) {
      return {
        success: false,
        errors: result.error.issues.map(
          (issue) => `${issue.path.join('.')}: ${issue.message}`
        ),
      };
    }
    return { success: true, data: result.data };
  }

  static validateBio(bio: unknown): ProfileValidationResult<string> {
    if (typeof bio !== 'string') {
      return { success: false, errors: ['bio: must be a string'] };
    }
    if (bio.trim().length > USER_PROFILE.BIO_MAX_LENGTH) {
      return {
        success: false,
        errors: [`bio: exceeds max length (${USER_PROFILE.BIO_MAX_LENGTH})`],
      };
    }
    return { success: true, data: bio };
  }

  static validateAvatarUrl(url: unknown): ProfileValidationResult<string> {
    if (typeof url !== 'string') {
      return { success: false, errors: ['avatarUrl: must be a string'] };
    }
    try {
      new URL(url);
    } catch {
      return { success: false, errors: ['avatarUrl: invalid URL'] };
    }
    return { success: true, data: url };
  }
}
