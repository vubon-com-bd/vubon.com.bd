import { Injectable } from '@nestjs/common';
import { BIOMETRIC_CONFIG } from '../../config/biometric.config';
import { BiometricFailedError } from '../../../domain/errors/biometric.errors';

@Injectable()
export class BiometricValidatorService {
  assertEnabled(): void {
    if (!BIOMETRIC_CONFIG.enabled) {
      throw new BiometricFailedError('biometric disabled');
    }
  }

  assertSupportedType(type: string): void {
    const allowed = BIOMETRIC_CONFIG.allowedTypes as readonly string[];
    if (!allowed.includes(type)) {
      throw new BiometricFailedError(`unsupported type: ${type}`);
    }
  }

  getMaxEnrollmentsPerUser(): number {
    return BIOMETRIC_CONFIG.maxEnrollmentsPerUser;
  }

  getChallengeTtlSeconds(): number {
    return BIOMETRIC_CONFIG.challengeTtlSeconds;
  }
}
