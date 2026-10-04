/**
 * UserValidator — Zod-based validation for user use cases
 * @module user-service/application/validators
 */
import {
  CreateUserRequestSchema,
  UpdateUserRequestSchema,
} from '@vubon/shared-schemas/user';
import type {
  CreateUserRequestDTO,
  UpdateUserRequestDTO,
} from '../dtos/requests/user/index.js';

export interface ValidationResult<T> {
  readonly success: boolean;
  readonly data?: T;
  readonly errors?: readonly string[];
}

export class UserValidator {
  static validateCreate(input: unknown): ValidationResult<CreateUserRequestDTO> {
    const result = CreateUserRequestSchema.safeParse(input);
    if (!result.success) {
      return {
        success: false,
        errors: result.error.issues.map(
          (issue) => `${issue.path.join('.')}: ${issue.message}`
        ),
      };
    }
    return { success: true, data: result.data as CreateUserRequestDTO };
  }

  static validateUpdate(input: unknown): ValidationResult<UpdateUserRequestDTO> {
    const result = UpdateUserRequestSchema.safeParse(input);
    if (!result.success) {
      return {
        success: false,
        errors: result.error.issues.map(
          (issue) => `${issue.path.join('.')}: ${issue.message}`
        ),
      };
    }
    return { success: true, data: result.data as UpdateUserRequestDTO };
  }

  static assertValidCreate(input: unknown): CreateUserRequestDTO {
    const result = UserValidator.validateCreate(input);
    if (!result.success || !result.data) {
      throw new Error(
        `Invalid create user input: ${(result.errors ?? []).join('; ')}`
      );
    }
    return result.data;
  }

  static assertValidUpdate(input: unknown): UpdateUserRequestDTO {
    const result = UserValidator.validateUpdate(input);
    if (!result.success || !result.data) {
      throw new Error(
        `Invalid update user input: ${(result.errors ?? []).join('; ')}`
      );
    }
    return result.data;
  }
}
