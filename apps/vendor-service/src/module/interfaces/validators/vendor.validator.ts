import { Injectable } from '@nestjs/common';

@Injectable()
export class VendorValidator {
  validateRegister(input: unknown): void {
    const data = input as Record<string, unknown>;
    if (!data.businessName || typeof data.businessName !== 'string') {
      throw new Error('businessName is required');
    }
    if (!data.contactEmail || typeof data.contactEmail !== 'string') {
      throw new Error('contactEmail is required');
    }
    if (!data.contactPhone || typeof data.contactPhone !== 'string') {
      throw new Error('contactPhone is required');
    }
  }
}
