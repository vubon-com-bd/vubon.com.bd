/**
 * Complaint Schema
 * @module shared-schemas/support
 *
 * Values আসে shared-constants/support/complaint.constants থেকে।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema';
import { UuidSchema } from '../common/primitives/uuid.schema';
import {
  COMPLAINT_TYPE,
  COMPLAINT_STATUS,
  COMPLAINT_SEVERITY,
  COMPLAINT,
} from '@vubon/shared-constants/support';

export const ComplaintTypeSchema = z.enum(Object.values(COMPLAINT_TYPE) as [string, ...string[]]);

export const ComplaintStatusSchema = z.enum(
  Object.values(COMPLAINT_STATUS) as [string, ...string[]]
);

export const ComplaintSeveritySchema = z.enum(
  Object.values(COMPLAINT_SEVERITY) as [string, ...string[]]
);

export const ComplaintSchema = BaseEntitySchema.extend({
  complaintNumber: z.string().min(1).max(50),
  subject: z.string().trim().min(1).max(COMPLAINT.SUBJECT_MAX_LENGTH),
  description: z
    .string()
    .trim()
    .min(COMPLAINT.DESCRIPTION_MIN_LENGTH)
    .max(COMPLAINT.DESCRIPTION_MAX_LENGTH),
  type: ComplaintTypeSchema,
  status: ComplaintStatusSchema,
  severity: ComplaintSeveritySchema,
  userId: UuidSchema.optional(),
  orderId: UuidSchema.optional(),
  productId: UuidSchema.optional(),
  attachments: z.array(z.string().url()).max(COMPLAINT.MAX_ATTACHMENTS).optional(),
  assignedTo: UuidSchema.optional(),
  resolution: z.string().max(5000).optional(),
  acknowledgedAt: z.string().datetime().optional(),
  resolvedAt: z.string().datetime().optional(),
  closedAt: z.string().datetime().optional(),
  reopenedAt: z.string().datetime().optional(),
  slaBreachedAt: z.string().datetime().optional(),
});

export const ComplaintPublicSchema = ComplaintSchema.pick({
  id: true,
  complaintNumber: true,
  subject: true,
  status: true,
  severity: true,
  createdAt: true,
  resolvedAt: true,
});

export const ComplaintCreateInputSchema = z
  .object({
    subject: z.string().trim().min(1).max(COMPLAINT.SUBJECT_MAX_LENGTH),
    description: z
      .string()
      .trim()
      .min(COMPLAINT.DESCRIPTION_MIN_LENGTH)
      .max(COMPLAINT.DESCRIPTION_MAX_LENGTH),
    type: ComplaintTypeSchema,
    severity: ComplaintSeveritySchema,
    orderId: UuidSchema.optional(),
    productId: UuidSchema.optional(),
    attachments: z.array(z.string().url()).max(COMPLAINT.MAX_ATTACHMENTS).optional(),
  })
  .strict();

export type ComplaintTypeSchemaType = z.infer<typeof ComplaintTypeSchema>;
export type ComplaintStatusSchemaType = z.infer<typeof ComplaintStatusSchema>;
export type ComplaintSeveritySchemaType = z.infer<typeof ComplaintSeveritySchema>;
export type ComplaintSchemaType = z.infer<typeof ComplaintSchema>;
export type ComplaintPublicSchemaType = z.infer<typeof ComplaintPublicSchema>;
export type ComplaintCreateInputSchemaType = z.infer<typeof ComplaintCreateInputSchema>;
