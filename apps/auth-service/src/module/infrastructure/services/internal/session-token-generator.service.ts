import { Injectable } from '@nestjs/common';
import { randomBytes, createHash } from 'node:crypto';
import type { SessionTokenGeneratorPort } from '../../../application/ports/session-token-generator.port';

@Injectable()
export class SessionTokenGeneratorService implements SessionTokenGeneratorPort {
  generate(): string {
    return randomBytes(32).toString('hex');
  }

  hash(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }
}
