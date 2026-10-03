/**
 * KycValidator
 * @module user-service/application/validators
 *
 * NOTE: userId আসে auth context থেকে (controller এ).
 * Zod schema শুধু body validate করে — তাই আমরা userId আলাদা inject করি।
 */
import { SubmitKycRequestSchema } from '@vubon/shared-schemas/user';
import { USER_KYC } from '@vubon/shared-constants/user';
import type { SubmitKycRequestDTO } from '../dtos/requests/kyc/index.js';

export interface KycValidationResult<T> {
  readonly success: boolean;
  readonly data?: T;
  readonly errors?: readonly string[];
}

export class KycValidator {
  static validateSubmit(
    input: unknown,
    userId: string
  ): KycValidationResult<SubmitKycRequestDTO> {
    const result = SubmitKycRequestSchema.safeParse(input);
    if (!result.success) {
      return {
        success: false,
        errors: result.error.issues.map(
          (issue) => `${issue.path.join('.')}: ${issue.message}`
        ),
      };
    }

    if (typeof userId !== 'string' || userId.trim().length === 0) {
      return {
        success: false,
        errors: ['userId: required (from auth context)'],
      };
    }

    const data: SubmitKycRequestDTO = {
      userId: userId.trim(),
      documents: result.data.documents.map((doc) => ({
        type: doc.type,
        frontUrl: doc.frontUrl,
        number: doc.number,
        backUrl: doc.backUrl,
        selfieUrl: doc.selfieUrl,
      })),
      acceptTerms: true,
    };

    return { success: true, data };
  }

  static validateDocumentCount(count: number): KycValidationResult<number> {
    if (count < 1) {
      return { success: false, errors: ['documents: at least 1 required'] };
    }
    if (count > USER_KYC.MAX_DOCUMENTS) {
      return {
        success: false,
        errors: [`documents: exceeds maximum (${USER_KYC.MAX_DOCUMENTS})`],
      };
    }
    return { success: true, data: count };
  }

  static validateRejectionReason(reason: string): KycValidationResult<string> {
    if (typeof reason !== 'string' || reason.trim().length === 0) {
      return { success: false, errors: ['reason: required'] };
    }
    if (reason.length > 500) {
      return { success: false, errors: ['reason: too long (max 500)'] };
    }
    return { success: true, data: reason.trim() };
  }

  static assertValidSubmit(input: unknown, userId: string): SubmitKycRequestDTO {
    const result = KycValidator.validateSubmit(input, userId);
    if (!result.success || !result.data) {
      throw new Error(
        `Invalid submit KYC input: ${(result.errors ?? []).join('; ')}`
      );
    }
    return result.data;
  }
}
