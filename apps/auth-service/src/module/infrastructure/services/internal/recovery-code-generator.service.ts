import { Injectable } from '@nestjs/common';
import { randomBytes } from 'node:crypto';
import type { RecoveryCodeGeneratorPort } from '../../../application/ports/recovery-code-generator.port';

@Injectable()
export class RecoveryCodeGeneratorService implements RecoveryCodeGeneratorPort {
  generate(count: number): readonly string[] {
    const codes: string[] = [];
    for (let i = 0; i < count; i++) {
      const raw = randomBytes(6).toString('hex').toUpperCase();
      const formatted = `${raw.slice(0, 4)}-${raw.slice(4, 8)}-${raw.slice(8, 12)}`;
      codes.push(formatted);
    }
    return codes;
  }

  normalize(code: string): string {
    return code.replace(/[^A-Z0-9]/gi, '').toUpperCase();
  }
}
