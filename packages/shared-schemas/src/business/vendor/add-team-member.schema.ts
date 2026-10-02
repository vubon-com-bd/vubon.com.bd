/**
 * Add Team Member Request Schema
 * @module shared-schemas/business/vendor/requests
 */

import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema.js';
import { EmailSchema } from '../../common/primitives/email.schema.js';
import { VendorRoleSchema } from './vendor-role.schema.js';

export const AddTeamMemberRequestSchema = z
  .object({
    vendorId: UuidSchema,
    email: EmailSchema,
    role: VendorRoleSchema,
    message: z.string().max(500).optional(),
  })
  .strict();

export const AcceptTeamInviteRequestSchema = z
  .object({
    token: z.string().min(16).max(255),
    userId: UuidSchema,
  })
  .strict();

export type AddTeamMemberRequestSchemaType = z.infer<typeof AddTeamMemberRequestSchema>;
export type AcceptTeamInviteRequestSchemaType = z.infer<typeof AcceptTeamInviteRequestSchema>;
