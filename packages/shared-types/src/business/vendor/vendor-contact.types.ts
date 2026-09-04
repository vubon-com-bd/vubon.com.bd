/**
 * Vendor Contact Types
 * ভেন্ডর যোগাযোগ সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { Vendor } from './vendor.types';

export interface VendorContact extends BaseEntity {
  vendorId: string;
  vendor: Vendor;
  primaryContactName: string;
  primaryContactPhone: string;
  primaryContactEmail: string;
  secondaryContactName?: string;
  secondaryContactPhone?: string;
  secondaryContactEmail?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  supportPhone?: string;
  supportEmail?: string;
  supportHours?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    whatsapp?: string;
    telegram?: string;
  };
  preferredContactMethod: 'email' | 'phone' | 'whatsapp' | 'telegram' | 'in_app';
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorContactCreateInput {
  vendorId: string;
  primaryContactName: string;
  primaryContactPhone: string;
  primaryContactEmail: string;
  secondaryContactName?: string;
  secondaryContactPhone?: string;
  secondaryContactEmail?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  supportPhone?: string;
  supportEmail?: string;
  supportHours?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    whatsapp?: string;
    telegram?: string;
  };
  preferredContactMethod?: 'email' | 'phone' | 'whatsapp' | 'telegram' | 'in_app';
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorContactUpdateInput {
  primaryContactName?: string;
  primaryContactPhone?: string;
  primaryContactEmail?: string;
  secondaryContactName?: string;
  secondaryContactPhone?: string;
  secondaryContactEmail?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  supportPhone?: string;
  supportEmail?: string;
  supportHours?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    whatsapp?: string;
    telegram?: string;
  };
  preferredContactMethod?: 'email' | 'phone' | 'whatsapp' | 'telegram' | 'in_app';
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorContactResponse {
  vendorContact: VendorContact;
}
