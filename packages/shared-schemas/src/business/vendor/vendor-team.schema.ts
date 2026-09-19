/**
 * Vendor Team Schema
 * @module shared-schemas/business/vendor
 *
 * Values আসে shared-constants/business/vendor-team.constants থেকে।
 */

import { z } from 'zod';
import { VENDOR_TEAM_STATUS, VENDOR_TEAM_INVITE_STATUS } from '@vubon/shared-constants/business';
import { BaseEntitySchema } from '../../common/base/base-entity.schema';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { EmailSchema } from '../../common/primitives/email.schema';
import { VendorRoleSchema } from './vendor-role.schema';

export const VendorTeamStatusSchema = z.enum(
  Object.values(VENDOR_TEAM_STATUS) as [string, ...string[]]
);

export const VendorTeamInviteStatusSchema = z.enum(
  Object.values(VENDOR_TEAM_INVITE_STATUS) as [string, ...string[]]
);

export const VendorTeamMemberSchema = BaseEntitySchema.extend({
  vendorId: UuidSchema,
  userId: UuidSchema,
  email: EmailSchema,
  name: z.string().min(1).max(150),
  role: VendorRoleSchema,
  status: VendorTeamStatusSchema,
  joinedAt: z.string().datetime(),
  lastActiveAt: z.string().datetime().optional(),
  invitedBy: UuidSchema.optional(),
});

export const VendorTeamMemberPublicSchema = VendorTeamMemberSchema.pick({
  userId: true,
  name: true,
  email: true,
  role: true,
  status: true,
  joinedAt: true,
});

export const VendorTeamInviteSchema = z.object({
  id: UuidSchema,
  vendorId: UuidSchema,
  email: EmailSchema,
  role: VendorRoleSchema,
  status: VendorTeamInviteStatusSchema,
  token: z.string().min(16).max(255),
  invitedBy: UuidSchema,
  invitedAt: z.string().datetime(),
  expiresAt: z.string().datetime(),
  acceptedAt: z.string().datetime().optional(),
});

export type VendorTeamStatusSchemaType = z.infer<typeof VendorTeamStatusSchema>;
export type VendorTeamInviteStatusSchemaType = z.infer<typeof VendorTeamInviteStatusSchema>;
export type VendorTeamMemberSchemaType = z.infer<typeof VendorTeamMemberSchema>;
export type VendorTeamMemberPublicSchemaType = z.infer<typeof VendorTeamMemberPublicSchema>;
export type VendorTeamInviteSchemaType = z.infer<typeof VendorTeamInviteSchema>;
