/**
 * RegisterVendorValidator — pre-command validation
 * @module vendor-service/application/validators
 */
import { Injectable } from '@nestjs/common';
import type { RegisterVendorRequestDto } from '../dtos/requests/register-vendor.dto.js';
import {
  VendorRegistrationFailedError,
} from '../errors/vendor.errors.js';

const REQUIRED_DOCUMENT_TYPES = ['business_license', 'tax_id'] as const;

@Injectable()
export class RegisterVendorValidator {
  validate(dto: RegisterVendorRequestDto): void {
    if (!dto.ownerId || dto.ownerId.trim().length === 0) {
      throw new VendorRegistrationFailedError('ownerId is required');
    }
    if (!dto.businessName || dto.businessName.trim().length < 2) {
      throw new VendorRegistrationFailedError('businessName must be at least 2 chars');
    }
    if (!dto.displayName || dto.displayName.trim().length < 2) {
      throw new VendorRegistrationFailedError('displayName must be at least 2 chars');
    }
    if (!dto.contactEmail || !dto.contactEmail.includes('@')) {
      throw new VendorRegistrationFailedError('contactEmail is invalid');
    }
    if (!dto.contactPhone || dto.contactPhone.trim().length < 6) {
      throw new VendorRegistrationFailedError('contactPhone is invalid');
    }
    if (!dto.addressLine1 || dto.addressLine1.trim().length < 3) {
      throw new VendorRegistrationFailedError('addressLine1 is invalid');
    }
    if (!dto.division || !dto.district) {
      throw new VendorRegistrationFailedError('division and district are required');
    }
    if (!dto.acceptTerms) {
      throw new VendorRegistrationFailedError('acceptTerms must be true');
    }
    if (dto.documents && dto.documents.length > 20) {
      throw new VendorRegistrationFailedError('too many documents');
    }
    if (dto.documents) {
      const types = new Set<string>();
      for (const doc of dto.documents) {
        if (!doc.url || !/^https?:\/\//i.test(doc.url)) {
          throw new VendorRegistrationFailedError(`document URL is invalid: ${doc.url}`);
        }
        if (types.has(doc.type)) {
          throw new VendorRegistrationFailedError(`duplicate document type: ${doc.type}`);
        }
        types.add(doc.type);
      }
    }
  }

  requiresDocumentType(type: string): boolean {
    return (REQUIRED_DOCUMENT_TYPES as readonly string[]).includes(type);
  }
}
