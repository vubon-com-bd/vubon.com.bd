import { Injectable } from '@nestjs/common';
import { randomBytes } from 'node:crypto';

@Injectable()
export class SkuGeneratorService {
  generate(prefix: string, length: number = 4): string {
    const suffix = randomBytes(length).toString('hex').toUpperCase().slice(0, length * 2);
    return `${prefix.toUpperCase()}-${suffix}`;
  }
}
