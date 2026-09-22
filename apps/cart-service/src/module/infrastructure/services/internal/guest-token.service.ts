import { Injectable } from '@nestjs/common';
import { randomBytes } from 'node:crypto';
import { GuestTokenVO } from '../../../domain/value-objects/primitives/guest-token.vo';

@Injectable()
export class GuestTokenService {
  generate(): GuestTokenVO {
    const raw = randomBytes(24).toString('hex');
    return GuestTokenVO.create(raw);
  }

  isValid(token: string): boolean {
    return typeof token === 'string' && token.length >= 16 && token.length <= 128;
  }
}
