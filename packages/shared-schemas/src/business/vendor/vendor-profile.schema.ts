import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { NameSchema } from '../../common/name.schema';
import { AddressSchema } from '../../common/address.schema';
import { VENDOR_PROFILE } from '@vubon/shared-constants/src/business/vendor/vendor-profile.constants';

const vendorProfileKeys = Object.keys(VENDOR_PROFILE.TYPES) as [string, ...string[]];

export const VendorProfileSchema = BaseSchema.extend({
  profileId: z.string().uuid(),
  vendorId: z.string().uuid(),
  name: NameSchema,
  displayName: z.string().min(1).max(255),
  logo: z.string().url().optional(),
  banner: z.string().url().optional(),
  description: z.string().max(1000).optional(),
  about: z.string().max(5000).optional(),
  address: AddressSchema.optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
  socialLinks: z
    .object({
      facebook: z.string().url().optional(),
      instagram: z.string().url().optional(),
      twitter: z.string().url().optional(),
      linkedin: z.string().url().optional(),
      youtube: z.string().url().optional(),
    })
    .optional(),
  storeHours: z
    .object({
      monday: z.string(),
      tuesday: z.string(),
      wednesday: z.string(),
      thursday: z.string(),
      friday: z.string(),
      saturday: z.string(),
      sunday: z.string(),
    })
    .optional(),
  visibility: z.enum(vendorProfileKeys),
  isPublic: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
