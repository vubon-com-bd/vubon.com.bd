import { BaseEntity } from '../../common/base.types';
import { Vendor } from './vendor.types';

export interface VendorSettingsValues {
  storeName: string;
  storeDescription: string;
  storeLogo?: string;
  storeBanner?: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  timezone: string;
  currency: string;
  language: string;
  allowReturns: boolean;
  returnWindow: number;
  allowReviews: boolean;
  autoApproveReviews: boolean;
}

export interface VendorSettings extends BaseEntity {
  settingsId: string;
  vendorId: string;
  vendor: Vendor;
  key: string;
  value: unknown;
  description?: string;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
