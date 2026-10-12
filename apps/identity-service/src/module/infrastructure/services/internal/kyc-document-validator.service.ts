/**
 * KycDocumentValidatorService
 * @module identity-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';
import { KycValidatorService } from '../../../domain/services/kyc-validator.service.js';

@Injectable()
export class KycDocumentValidatorService {
  validateSubmission(
    documents: readonly { type: { value: string }; frontUrl: string; backUrl?: string }[],
    userType: 'individual' | 'business' | 'vendor' | 'admin' | 'staff' | 'guest' | 'system',
  ): { valid: boolean; reasons: readonly string[] } {
    return KycValidatorService.validateSubmission(
      documents as never,
      userType,
    );
  }

  assertValid(
    documents: readonly { type: { value: string }; frontUrl: string; backUrl?: string }[],
    userType: 'individual' | 'business' | 'vendor' | 'admin' | 'staff' | 'guest' | 'system',
  ): void {
    KycValidatorService.assertValid(documents as never, userType);
  }
}
