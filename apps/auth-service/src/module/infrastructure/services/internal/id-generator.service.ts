/**
 * IdGeneratorService — UUID + short id generation
 * @module auth-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';
import { randomUUID, randomBytes } from 'node:crypto';
import type { IdGeneratorServiceInterface } from '../../../application/services/interfaces/id-generator.service.interface';

@Injectable()
export class IdGeneratorService implements IdGeneratorServiceInterface {
  readonly name = 'IdGeneratorService';

  generate(): string {
    // 24-char base64url-safe id
    return randomBytes(18).toString('base64url');
  }

  generateUuid(): string {
    return randomUUID();
  }
}
