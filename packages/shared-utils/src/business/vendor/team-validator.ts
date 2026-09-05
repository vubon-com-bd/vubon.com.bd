/**
 * Vendor Team Validator
 * ভেন্ডর টিম ভ্যালিডেটর
 */

import { VENDOR_TEAM } from '@vubon/shared-constants';
import { VendorTeamSchema } from '@vubon/shared-schemas';
import type { VendorTeam } from '@vubon/shared-types';

export interface VendorTeamValidationResult {
  valid: boolean;
  errors: Record<string, string[]>;
  data?: VendorTeam;
}

export const validateVendorTeam = (data: unknown): VendorTeamValidationResult => {
  const errors: Record<string, string[]> = {};
  let valid = true;

  if (!data || typeof data !== 'object') {
    return {
      valid: false,
      errors: { _global: ['Invalid team data'] },
    };
  }

  const team = data as Record<string, unknown>;

  // Vendor ID validation
  if (!team.vendorId || typeof team.vendorId !== 'string') {
    errors.vendorId = ['Vendor ID is required'];
    valid = false;
  }

  // Name validation
  if (!team.name || typeof team.name !== 'string' || team.name.length < 1) {
    errors.name = ['Team name is required'];
    valid = false;
  }

  // Status validation - VENDOR_TEAM ব্যবহার
  if (team.status) {
    const statusValues = Object.values(VENDOR_TEAM.STATUS) as string[];
    if (!statusValues.includes(team.status as string)) {
      errors.status = ['Invalid team status'];
      valid = false;
    }
  }

  // Permissions validation - VENDOR_TEAM ব্যবহার
  if (team.permissions && Array.isArray(team.permissions)) {
    const validPermissions = Object.values(VENDOR_TEAM.PERMISSIONS) as string[];
    for (const permission of team.permissions) {
      if (!validPermissions.includes(permission as string)) {
        errors.permissions = [`Invalid permission: ${permission}`];
        valid = false;
        break;
      }
    }
  }

  // Members count validation (optional)
  if (team.members && Array.isArray(team.members)) {
    const maxMembers = VENDOR_TEAM.DEFAULTS.MAX_MEMBERS;
    if (team.members.length > maxMembers) {
      errors.members = [`Team cannot have more than ${maxMembers} members`];
      valid = false;
    }
    if (team.members.length < VENDOR_TEAM.DEFAULTS.MIN_MEMBERS) {
      errors.members = [`Team must have at least ${VENDOR_TEAM.DEFAULTS.MIN_MEMBERS} member`];
      valid = false;
    }
  }

  try {
    const validatedData = VendorTeamSchema.parse(data);
    return {
      valid: true,
      errors: {},
      data: validatedData as VendorTeam,
    };
  } catch {
    return {
      valid,
      errors,
    };
  }
};

export const validateVendorTeamCreate = (data: unknown): VendorTeamValidationResult => {
  return validateVendorTeam(data);
};

export const validateVendorTeamUpdate = (data: unknown): VendorTeamValidationResult => {
  return validateVendorTeam(data);
};
