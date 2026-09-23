import { Injectable } from '@nestjs/common';
import { randomBytes } from 'node:crypto';

@Injectable()
export class ReferralCodeGeneratorService {
  generate(prefix: string = 'REF'): string {
    const raw = randomBytes(5).toString('hex').toUpperCase();
    return `${prefix}-${raw}`;
  }
}
