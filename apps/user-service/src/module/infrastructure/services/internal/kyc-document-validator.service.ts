import { Injectable } from '@nestjs/common';
import { KYC_CONFIG } from '../../config/kyc.config';

@Injectable()
export class KycDocumentValidatorService {
  validate(type: string): boolean {
    return (KYC_CONFIG.allowedDocuments as readonly string[]).includes(type);
  }

  isSupported(document: string): boolean {
    return this.validate(document);
  }
}
