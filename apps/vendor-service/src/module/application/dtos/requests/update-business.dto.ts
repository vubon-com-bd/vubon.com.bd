/**
 * UpdateVendorBusinessRequestDto — legal entity info update
 * @module vendor-service/application/dtos/requests
 */
import type {
  VendorTypeValue,
  VendorBusinessTypeValue,
} from '@vubon/shared-types/business/vendor';

export class UpdateVendorBusinessRequestDto {
  vendorId!: string;
  type?: VendorTypeValue;
  businessType?: VendorBusinessTypeValue;
  legalName?: string;
  registrationNumber?: string;
  description?: string;
  idempotencyKey?: string;
}
