/**
 * RegisterVendorRequestDto — vendor onboarding input
 * @module vendor-service/application/dtos/requests
 */
import type {
  VendorTypeValue,
  VendorBusinessTypeValue,
} from '@vubon/shared-types/business/vendor';
import type { VENDOR_DOCUMENT_TYPE } from '@vubon/shared-constants/business';

export class RegisterVendorRequestDto {
  ownerId!: string;
  businessName!: string;
  displayName!: string;
  slug?: string;
  vendorType!: VendorTypeValue;
  businessType!: VendorBusinessTypeValue;
  businessRegistration?: string;
  businessDescription?: string;
  contactPhone!: string;
  contactEmail!: string;
  addressLine1!: string;
  addressLine2?: string;
  division!: string;
  district!: string;
  upazila?: string;
  postalCode?: string;
  acceptTerms!: boolean;
  documents?: Array<{
    type: (typeof VENDOR_DOCUMENT_TYPE)[keyof typeof VENDOR_DOCUMENT_TYPE];
    url: string;
    documentNumber?: string;
    issuedAt?: string;
    expiresAt?: string;
  }>;
  idempotencyKey?: string;
}
