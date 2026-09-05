/**
 * Vendor Settings Validator
 * ভেন্ডর সেটিংস ভ্যালিডেটর
 */

import { UserSettingsSchema } from '@vubon/shared-schemas';
import type { VendorSettings } from '@vubon/shared-types';

export interface VendorSettingsValidationResult {
  valid: boolean;
  errors: Record<string, string[]>;
  data?: VendorSettings;
}

export const validateVendorSettings = (data: unknown): VendorSettingsValidationResult => {
  const errors: Record<string, string[]> = {};
  let valid = true;

  if (!data || typeof data !== 'object') {
    return {
      valid: false,
      errors: { _global: ['Invalid settings data'] },
    };
  }

  const settings = data as Record<string, unknown>;

  if (!settings.vendorId || typeof settings.vendorId !== 'string') {
    errors.vendorId = ['Vendor ID is required'];
    valid = false;
  }

  if (settings.language) {
    const validLanguages = ['bn', 'en'] as string[];
    if (!validLanguages.includes(settings.language as string)) {
      errors.language = ['Invalid language'];
      valid = false;
    }
  }

  if (settings.timezone && typeof settings.timezone !== 'string') {
    errors.timezone = ['Timezone must be a string'];
    valid = false;
  }

  if (settings.currency && typeof settings.currency !== 'string') {
    errors.currency = ['Currency must be a string'];
    valid = false;
  }

  if (
    settings.notificationEnabled !== undefined &&
    typeof settings.notificationEnabled !== 'boolean'
  ) {
    errors.notificationEnabled = ['Notification enabled must be a boolean'];
    valid = false;
  }

  if (settings.autoApproveOrders !== undefined && typeof settings.autoApproveOrders !== 'boolean') {
    errors.autoApproveOrders = ['Auto approve orders must be a boolean'];
    valid = false;
  }

  if (settings.taxRate !== undefined) {
    if (typeof settings.taxRate !== 'number' || settings.taxRate < 0 || settings.taxRate > 100) {
      errors.taxRate = ['Tax rate must be between 0 and 100'];
      valid = false;
    }
  }

  if (settings.shippingFee !== undefined) {
    if (typeof settings.shippingFee !== 'number' || settings.shippingFee < 0) {
      errors.shippingFee = ['Shipping fee must be a positive number'];
      valid = false;
    }
  }

  if (settings.freeShippingThreshold !== undefined) {
    if (typeof settings.freeShippingThreshold !== 'number' || settings.freeShippingThreshold < 0) {
      errors.freeShippingThreshold = ['Free shipping threshold must be a positive number'];
      valid = false;
    }
  }

  try {
    const validatedData = UserSettingsSchema.parse(data);
    return {
      valid: true,
      errors: {},
      data: validatedData as unknown as VendorSettings,
    };
  } catch {
    return {
      valid,
      errors,
    };
  }
};

export const validateVendorSettingsCreate = (data: unknown): VendorSettingsValidationResult => {
  return validateVendorSettings(data);
};

export const validateVendorSettingsUpdate = (data: unknown): VendorSettingsValidationResult => {
  return validateVendorSettings(data);
};
