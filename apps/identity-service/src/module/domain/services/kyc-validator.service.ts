/**
 * KycValidatorService
 * @module identity-service/domain/services
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import type { KycDocumentEntry } from '../entities/user-kyc.entity.js';

export interface KycValidationResult {
  readonly valid: boolean;
  readonly reasons: readonly string[];
}

export class KycValidatorService {
  private static readonly REQUIRED_DOCUMENTS_FOR_INDIVIDUAL = ['national_id'];
  private static readonly REQUIRED_DOCUMENTS_FOR_BUSINESS = ['trade_license', 'tin_certificate'];

  static validateSubmission(
    documents: readonly KycDocumentEntry[],
    userType: 'individual' | 'business' | 'vendor' | 'admin' | 'staff' | 'guest' | 'system',
  ): KycValidationResult {
    const reasons: string[] = [];

    if (documents.length === 0) {
      reasons.push('no_documents');
    }

    // Check document image URLs
    for (const doc of documents) {
      if (!doc.frontUrl || !doc.frontUrl.startsWith('http')) {
        reasons.push(`invalid_front_url:${doc.type.value}`);
      }
      if (doc.backUrl && !doc.backUrl.startsWith('http')) {
        reasons.push(`invalid_back_url:${doc.type.value}`);
      }
    }

    // Check required documents by user type
    if (userType === 'business' || userType === 'vendor') {
      for (const required of this.REQUIRED_DOCUMENTS_FOR_BUSINESS) {
        if (!documents.some((d) => d.type.value === required)) {
          reasons.push(`missing_required:${required}`);
        }
      }
    } else {
      for (const required of this.REQUIRED_DOCUMENTS_FOR_INDIVIDUAL) {
        if (!documents.some((d) => d.type.value === required)) {
          reasons.push(`missing_required:${required}`);
        }
      }
    }

    return { valid: reasons.length === 0, reasons };
  }

  static assertValid(
    documents: readonly KycDocumentEntry[],
    userType: 'individual' | 'business' | 'vendor' | 'admin' | 'staff' | 'guest' | 'system',
  ): void {
    const result = this.validateSubmission(documents, userType);
    if (!result.valid) {
      throw new BusinessRuleError(
        `Invalid KYC submission: ${result.reasons.join(', ')}`,
        'KYC_INVALID_SUBMISSION',
        { reasons: result.reasons },
      );
    }
  }

  static requiresSelfie(userType: string): boolean {
    return userType === 'individual' || userType === 'business';
  }
}
