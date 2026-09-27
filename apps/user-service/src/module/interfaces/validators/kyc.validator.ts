/**
 * KYC Validator
 */
import { SubmitKycRequestSchema } from '@vubon/shared-schemas/user';
import { USER_KYC } from '@vubon/shared-constants/user';

export interface KycValidationResult<T> {
  readonly success: boolean;
  readonly data?: T;
  readonly errors?: readonly string[];
}

export class KycValidator {
  static validateSubmit(input: unknown): KycValidationResult<unknown> {
    const result = SubmitKycRequestSchema.safeParse(input);
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

  static validateDocumentCount(count: number): KycValidationResult<number> {
    if (count < 1) {
      return { success: false, errors: ['documents: at least 1 required'] };
    }
    if (count > USER_KYC.MAX_DOCUMENTS) {
      return {
        success: false,
        errors: [`documents: exceeds max (${USER_KYC.MAX_DOCUMENTS})`],
      };
    }
    return { success: true, data: count };
  }

  static validateRejectionReason(reason: unknown): KycValidationResult<string> {
    if (typeof reason !== 'string' || reason.trim().length === 0) {
      return { success: false, errors: ['reason: required'] };
    }
    if (reason.length > 500) {
      return { success: false, errors: ['reason: too long (max 500)'] };
    }
    return { success: true, data: reason.trim() };
  }
}
