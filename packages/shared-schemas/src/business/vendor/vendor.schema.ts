import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { UserSchema } from '../../user/user.schema';
import { VendorProfileSchema } from './vendor-profile.schema';
import { VendorBusinessSchema } from './vendor-business.schema';
import { VendorContactSchema } from './vendor-contact.schema';
import { VendorAddressSchema } from './vendor-address.schema';
import { VendorBankAccountSchema } from './vendor-bank-account.schema';
import { VendorDocumentSchema } from './vendor-document.schema';
import { VendorCommissionSchema } from './vendor-commission.schema';
import { VENDOR_STATUS } from '@vubon/shared-constants/src/business/vendor/vendor-status.constants';
import { VENDOR_TYPE } from '@vubon/shared-constants/src/business/vendor/vendor-type.constants';
import { VENDOR_TIER } from '@vubon/shared-constants/src/business/vendor/vendor-tier.constants';

const vendorStatusKeys = Object.keys(VENDOR_STATUS) as [string, ...string[]];
const vendorTypeKeys = Object.keys(VENDOR_TYPE) as [string, ...string[]];
const vendorTierKeys = Object.keys(VENDOR_TIER) as [string, ...string[]];

export const VendorSchema = BaseSchema.extend({
  vendorId: z.string().uuid(),
  userId: z.string().uuid(),
  user: UserSchema,
  name: z.string().min(1).max(255),
  slug: z
    .string()
    .min(1)
    .max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  status: z.enum(vendorStatusKeys),
  type: z.enum(vendorTypeKeys),
  tier: z.enum(vendorTierKeys),
  profile: VendorProfileSchema,
  business: VendorBusinessSchema,
  contacts: z.array(VendorContactSchema),
  addresses: z.array(VendorAddressSchema),
  bankAccounts: z.array(VendorBankAccountSchema),
  documents: z.array(VendorDocumentSchema),
  commission: VendorCommissionSchema,
  isActive: z.boolean().default(true),
  isVerified: z.boolean().default(false),
  isApproved: z.boolean().default(false),
  isSuspended: z.boolean().default(false),
  joinedAt: z.date(),
  lastActiveAt: z.date(),
  metadata: z
    .object({
      businessLicense: z.string().optional(),
      taxId: z.string().optional(),
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
      holidaySchedule: z
        .array(
          z.object({
            date: z.date(),
            name: z.string(),
            isClosed: z.boolean(),
          })
        )
        .optional(),
    })
    .optional(),
});

export const VendorCreateSchema = VendorSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  isVerified: true,
  isApproved: true,
  isSuspended: true,
  joinedAt: true,
  lastActiveAt: true,
});

export const VendorUpdateSchema = VendorCreateSchema.partial();
