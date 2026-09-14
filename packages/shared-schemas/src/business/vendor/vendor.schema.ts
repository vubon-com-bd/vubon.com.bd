/**
 * Vendor Core Schema
 * @module shared-schemas/business/vendor
 *
 * Vendor entity + aggregator।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../../common/base/base-entity.schema';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { EmailSchema } from '../../common/primitives/email.schema';
import { PhoneSchema } from '../../common/primitives/phone.schema';
import { SlugSchema } from '../../common/primitives/slug.schema';
import { AddressSchema } from '../../common/geo/address.schema';
import { VendorStatusSchema } from './vendor-status.schema';
import { VendorTypeSchema, VendorBusinessTypeSchema } from './vendor-type.schema';
import { VendorTierSchema } from './vendor-tier.schema';
import { VendorCommissionSchema } from './vendor-commission.schema';
import { VendorReturnPolicySchema } from './vendor-return-policy.schema';

export const VendorSchema = BaseEntitySchema.extend({
  userId: UuidSchema,
  name: z.string().min(1).max(200),
  slug: SlugSchema,
  displayName: z.string().min(1).max(200),
  description: z.string().max(5000).optional(),
  type: VendorTypeSchema,
  businessType: VendorBusinessTypeSchema,
  status: VendorStatusSchema,
  tier: VendorTierSchema,
  email: EmailSchema,
  phone: PhoneSchema.optional(),
  website: z.string().url().optional(),
  logoUrl: z.string().url().optional(),
  bannerUrl: z.string().url().optional(),
  address: AddressSchema,
  commission: VendorCommissionSchema,
  returnPolicy: VendorReturnPolicySchema,
  rating: z.number().min(0).max(5),
  totalSales: z.number().nonnegative(),
  totalOrders: z.number().int().nonnegative(),
  isVerified: z.boolean(),
  isFeatured: z.boolean(),
  joinedAt: z.string().datetime(),
  approvedAt: z.string().datetime().optional(),
});

export const VendorPublicSchema = VendorSchema.pick({
  id: true,
  name: true,
  slug: true,
  displayName: true,
  description: true,
  type: true,
  tier: true,
  logoUrl: true,
  bannerUrl: true,
  rating: true,
  totalSales: true,
  isVerified: true,
  isFeatured: true,
  joinedAt: true,
});

export const VendorSummarySchema = VendorSchema.pick({
  id: true,
  name: true,
  displayName: true,
  logoUrl: true,
  status: true,
  tier: true,
  rating: true,
});

export const VendorListFilterSchema = z.object({
  status: VendorStatusSchema.optional(),
  type: VendorTypeSchema.optional(),
  tier: VendorTierSchema.optional(),
  isVerified: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  minRating: z.number().min(0).max(5).optional(),
  search: z.string().max(200).optional(),
});

export const VendorStatsSchema = z.object({
  vendorId: UuidSchema,
  totalProducts: z.number().int().nonnegative(),
  totalOrders: z.number().int().nonnegative(),
  totalRevenue: z.number().nonnegative(),
  totalCommission: z.number().nonnegative(),
  totalPayout: z.number().nonnegative(),
  averageRating: z.number().min(0).max(5),
  fulfillmentRate: z.number().min(0).max(1),
});

export type VendorSchemaType = z.infer<typeof VendorSchema>;
export type VendorPublicSchemaType = z.infer<typeof VendorPublicSchema>;
export type VendorSummarySchemaType = z.infer<typeof VendorSummarySchema>;
export type VendorListFilterSchemaType = z.infer<typeof VendorListFilterSchema>;
export type VendorStatsSchemaType = z.infer<typeof VendorStatsSchema>;
