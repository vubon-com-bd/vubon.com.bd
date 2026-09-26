/**
 * BiometricValidatorService
 * @module auth-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';
import { BiometricFailedAppError } from '../../../application/errors/biometric.errors';

const ALLOWED_KINDS = new Set<string>([
  'fingerprint', 'face', 'voice', 'iris',
]);

@Injectable()
export class BiometricValidatorService {
  readonly name = 'BiometricValidatorService';

  assertKind(kind: string): void {
    if (!ALLOWED_KINDS.has(kind.toLowerCase())) {
      throw new BiometricFailedAppError(`Unsupported biometric kind: ${kind}`);
    }
  }

  assertChallenge(challenge: string): void {
    if (!challenge || challenge.length < 8) {
      throw new BiometricFailedAppError('Invalid challenge');
    }
  }
}
