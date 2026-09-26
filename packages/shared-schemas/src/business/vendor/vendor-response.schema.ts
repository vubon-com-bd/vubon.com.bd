/**
 * Vendor Response Schema
 * @module shared-schemas/business/vendor/responses
 */

import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { VendorPublicSchema, VendorSummarySchema, VendorStatsSchema } from './vendor.schema';
import { VendorPayoutPublicSchema } from './vendor-payout.schema';
import { VendorTeamMemberPublicSchema } from './vendor-team.schema';

export const VendorResponseSchema = z.object({
  success: z.literal(true),
  vendor: VendorPublicSchema,
});

export const VendorListResponseSchema = z.object({
  success: z.literal(true),
  vendors: z.array(VendorSummarySchema).max(100),
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  totalPages: z.number().int().nonnegative(),
});

export const VendorStatsResponseSchema = z.object({
  success: z.literal(true),
  stats: VendorStatsSchema,
});

export const VendorPayoutResponseSchema = z.object({
  success: z.literal(true),
  payout: VendorPayoutPublicSchema,
});

export const VendorTeamInviteResponseSchema = z.object({
  success: z.literal(true),
  inviteId: UuidSchema,
  email: z.string().email(),
  expiresAt: z.string().datetime(),
});

export const VendorTeamListResponseSchema = z.object({
  success: z.literal(true),
  members: z.array(VendorTeamMemberPublicSchema).max(200),
  total: z.number().int().nonnegative(),
});

export type VendorResponseSchemaType = z.infer<typeof VendorResponseSchema>;
export type VendorListResponseSchemaType = z.infer<typeof VendorListResponseSchema>;
export type VendorStatsResponseSchemaType = z.infer<typeof VendorStatsResponseSchema>;
export type VendorPayoutResponseSchemaType = z.infer<typeof VendorPayoutResponseSchema>;
export type VendorTeamInviteResponseSchemaType = z.infer<typeof VendorTeamInviteResponseSchema>;
export type VendorTeamListResponseSchemaType = z.infer<typeof VendorTeamListResponseSchema>;
