/**
 * User Validator — Zod-based validation for HTTP boundary
 */
import {
  CreateUserRequestSchema,
  UpdateUserRequestSchema,
} from '@vubon/shared-schemas/user';

export interface UserValidationResult<T> {
  readonly success: boolean;
  readonly data?: T;
  readonly errors?: readonly string[];
}

export class UserValidator {
  static validateCreate(input: unknown): UserValidationResult<unknown> {
    const result = CreateUserRequestSchema.safeParse(input);
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

  static validateUpdate(input: unknown): UserValidationResult<unknown> {
    const result = UpdateUserRequestSchema.safeParse(input);
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
}
