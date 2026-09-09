import { BaseEntity } from '../../common/base.types';
import { Vendor } from './vendor.types';

export interface VendorPreferences extends BaseEntity {
  preferenceId: string;
  vendorId: string;
  vendor: Vendor;
  notificationEmail: boolean;
  notificationSms: boolean;
  notificationPush: boolean;
  notifyOnOrder: boolean;
  notifyOnPayment: boolean;
  notifyOnPayout: boolean;
  notifyOnReview: boolean;
  notifyOnSupport: boolean;
  language: string;
  timezone: string;
  dashboardLayout: string;
  metadata: Record<string, unknown>;
}
