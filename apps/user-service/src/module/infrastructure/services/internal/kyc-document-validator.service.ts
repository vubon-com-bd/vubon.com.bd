/**
 * KycDocumentValidatorService
 * @module user-service/infrastructure/services/internal
 *
 * Wraps domain KycEligibilityService + document-level validations.
 */
import { Injectable } from '@nestjs/common';
import { KycEligibilityService } from '@domain/services/kyc-eligibility.service';
import { UserEntity } from '@domain/entities/user.entity';
import { UserKycEntity } from '@domain/entities/user-kyc.entity';
import { KycDocumentVO } from '@domain/value-objects/primitives/kyc-document.vo';
import { USER_KYC } from '@vubon/shared-constants/user';

export interface KycDocumentInput {
  readonly type: string;
  readonly frontUrl: string;
  readonly backUrl?: string;
  readonly selfieUrl?: string;
  readonly number?: string;
}

export interface KycValidationResult {
  readonly valid: boolean;
  readonly errors: readonly string[];
}

@Injectable()
export class KycDocumentValidatorService {
  checkEligibility(
    user: UserEntity,
    existing?: UserKycEntity | null
  ): { eligible: boolean; reasons: readonly string[] } {
    return KycEligibilityService.check(user, existing);
  }

  validateDocuments(documents: readonly KycDocumentInput[]): KycValidationResult {
    const errors: string[] = [];

    if (documents.length === 0) {
      errors.push('At least one document required');
    }
    if (documents.length > USER_KYC.MAX_DOCUMENTS) {
      errors.push(`Too many documents (max ${USER_KYC.MAX_DOCUMENTS})`);
    }

    for (const [idx, doc] of documents.entries()) {
      try {
        KycDocumentVO.create(doc.type);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'invalid type';
        errors.push(`Document[${idx}].type: ${msg}`);
      }

      if (!doc.frontUrl || !doc.frontUrl.startsWith('http')) {
        errors.push(`Document[${idx}].frontUrl: must be a valid URL`);
      }

      if (doc.backUrl && !doc.backUrl.startsWith('http')) {
        errors.push(`Document[${idx}].backUrl: must be a valid URL`);
      }

      if (doc.selfieUrl && !doc.selfieUrl.startsWith('http')) {
        errors.push(`Document[${idx}].selfieUrl: must be a valid URL`);
      }
    }

    return { valid: errors.length === 0, errors };
  }

  requiresReverification(user: UserEntity, kyc: UserKycEntity): boolean {
    return KycEligibilityService.requiresReverification(user, kyc);
  }
}
