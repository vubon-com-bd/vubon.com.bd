/**
 * BiometricValidatorService
 * @module identity-service/domain/services
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export interface BiometricValidationInput {
  readonly type: string;
  readonly publicKeyHash?: string;
  readonly deviceId?: string;
  readonly challengeResponse?: string;
}

export class BiometricValidatorService {
  private static readonly STRONG_TYPES = ['face_id', 'iris', 'fingerprint'];

  static validate(input: BiometricValidationInput): readonly string[] {
    const reasons: string[] = [];

    if (!input.type) {
      reasons.push('missing_type');
    }

    if (this.STRONG_TYPES.includes(input.type)) {
      if (!input.publicKeyHash) {
        reasons.push('missing_public_key');
      } else if (input.publicKeyHash.length < 32) {
        reasons.push('weak_public_key');
      }
    }

    if (!input.deviceId) {
      reasons.push('missing_device_id');
    }

    return reasons;
  }

  static assertValid(input: BiometricValidationInput): void {
    const reasons = this.validate(input);
    if (reasons.length > 0) {
      throw new BusinessRuleError(
        `Invalid biometric setup: ${reasons.join(', ')}`,
        'BIOMETRIC_INVALID_SETUP',
        { reasons },
      );
    }
  }

  static assertVerification(input: BiometricValidationInput): void {
    if (!input.challengeResponse) {
      throw new BusinessRuleError(
        'Challenge response is required for verification',
        'BIOMETRIC_MISSING_CHALLENGE_RESPONSE',
      );
    }
    if (input.challengeResponse.length < 16) {
      throw new BusinessRuleError(
        'Challenge response too short',
        'BIOMETRIC_WEAK_CHALLENGE_RESPONSE',
      );
    }
  }

  static isStrongMethod(type: string): boolean {
    return this.STRONG_TYPES.includes(type);
  }
}
