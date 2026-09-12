import { BaseEntity } from '../../common/base.types';
import { Email } from '../../common/email.types';
import { PhoneNumber } from '../../common/phone.types';
import { VENDOR_CONTACT } from '@vubon/shared-constants/src/business/vendor/vendor-contact.constants';
import { Vendor } from './vendor.types';

export interface VendorContact extends BaseEntity {
  contactId: string;
  vendorId: string;
  vendor: Vendor;
  type: keyof typeof VENDOR_CONTACT.TYPES | string;
  name: string;
  email: Email;
  phone: PhoneNumber;
  designation: string;
  department: string;
  isPrimary: boolean;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
