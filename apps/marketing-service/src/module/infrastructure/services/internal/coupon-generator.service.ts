import { Injectable } from '@nestjs/common';
import { randomBytes } from 'node:crypto';

@Injectable()
export class CouponGeneratorService {
  generate(length: number = 10): string {
    const raw = randomBytes(Math.ceil(length / 2)).toString('hex');
    return raw.slice(0, length).toUpperCase();
  }

  generateHumanReadable(): string {
    const raw = randomBytes(6).toString('hex').toUpperCase();
    return `${raw.slice(0, 4)}-${raw.slice(4, 8)}-${raw.slice(8, 12)}`;
  }
}
