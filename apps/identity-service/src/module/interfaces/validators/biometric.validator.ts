/**
 * BiometricHttpValidator
 * @module identity-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';

const VALID_TYPES = ['fingerprint', 'face_id', 'voice', 'iris', 'palm'] as const;

export class BiometricHttpValidator {
  static validateEnable(body: unknown): void {
    const b = body as {
      type?: unknown;
      publicKeyHash?: unknown;
      deviceId?: unknown;
    };
    const details: { field: string; message: string }[] = [];

    if (!VALID_TYPES.includes(b?.type as (typeof VALID_TYPES)[number])) {
      details.push({
        field: 'type',
        message: `type must be one of: ${VALID_TYPES.join(', ')}`,
      });
    }
    if (typeof b?.publicKeyHash !== 'string' || b.publicKeyHash.length < 32) {
      details.push({
        field: 'publicKeyHash',
        message: 'publicKeyHash must be at least 32 characters',
      });
    }
    if (typeof b?.deviceId !== 'string' || b.deviceId.length === 0) {
      details.push({ field: 'deviceId', message: 'deviceId is required' });
    }

    if (details.length > 0) {
      throw new BadRequestException({
        statusCode: 400,
        code: 'VAL_REQUIRED',
        message: 'Biometric enable validation failed',
        details,
      });
    }
  }

  static validateVerify(body: unknown): void {
    const b = body as { deviceId?: unknown; challengeResponse?: unknown };
    const details: { field: string; message: string }[] = [];

    if (typeof b?.deviceId !== 'string' || b.deviceId.length === 0) {
      details.push({ field: 'deviceId', message: 'deviceId is required' });
    }
    if (
      typeof b?.challengeResponse !== 'string' ||
      b.challengeResponse.length < 16
    ) {
      details.push({
        field: 'challengeResponse',
        message: 'challengeResponse must be at least 16 characters',
      });
    }

    if (details.length > 0) {
      throw new BadRequestException({
        statusCode: 400,
        code: 'VAL_REQUIRED',
        message: 'Biometric verify validation failed',
        details,
      });
    }
  }

  static validateDisable(body: unknown): void {
    const b = body as { deviceId?: unknown };
    if (typeof b?.deviceId !== 'string' || b.deviceId.length === 0) {
      throw new BadRequestException({
        statusCode: 400,
        code: 'VAL_REQUIRED',
        message: 'Biometric disable validation failed',
        details: [{ field: 'deviceId', message: 'deviceId is required' }],
      });
    }
  }
}
