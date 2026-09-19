import { Injectable } from '@nestjs/common';
import { generateSecret, generateURI, verify } from 'otplib';
import type {
  MfaValidatorPort,
  MfaSetupResult,
} from '../../../application/ports/mfa-validator.port';

@Injectable()
export class MfaValidatorService implements MfaValidatorPort {
  async generateSecret(): Promise<MfaSetupResult> {
    const secret = generateSecret();
    const otpauthUrl = generateURI({
      strategy: 'totp',
      issuer: 'Vubon',
      label: 'user',
      secret,
    });
    const qrCodeDataUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(otpauthUrl)}`;
    return { secret, otpauthUrl, qrCodeDataUrl };
  }

  async verify(secret: string, token: string): Promise<boolean> {
    try {
      const result = await verify({ secret, token });
      return result.valid;
    } catch {
      return false;
    }
  }
}
