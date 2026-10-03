/**
 * GuestTokenService — secure guest token generation
 * @module cart-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';
import { randomBytes } from 'node:crypto';
import { GuestTokenVO } from '../../../domain/value-objects/primitives/guest-token.vo.js';

export const GUEST_TOKEN_SERVICE = Symbol('GUEST_TOKEN_SERVICE');

@Injectable()
export class GuestTokenService {
  /** Generate a cryptographically secure guest token (base64-url safe) */
  generate(): GuestTokenVO {
    const bytes = randomBytes(32);
    const token = bytes
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
    return GuestTokenVO.create(token);
  }

  /** Validate an existing token's shape */
  validate(token: string): GuestTokenVO {
    return GuestTokenVO.create(token);
  }

  /** Mask for logging */
  mask(token: GuestTokenVO): string {
    return token.mask();
  }
}
