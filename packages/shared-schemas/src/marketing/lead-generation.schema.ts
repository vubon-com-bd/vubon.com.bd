/**
 * Lead Generation Schema
 * @module shared-schemas/marketing
 *
 * Lead entity + aggregator।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema';
import { EmailSchema } from '../common/primitives/email.schema';
import { PhoneSchema } from '../common/primitives/phone.schema';
import { UuidSchema } from '../common/primitives/uuid.schema';
import { LeadStatusSchema, LeadQualitySchema } from './lead-status.schema';
import { LeadSourceSchema } from './lead-source.schema';

export const LeadSchema = BaseEntitySchema.extend({
  name: z.string().min(1).max(150),
  email: EmailSchema.optional(),
  phone: PhoneSchema.optional(),
  company: z.string().max(200).optional(),
  jobTitle: z.string().max(150).optional(),
  source: LeadSourceSchema,
  status: LeadStatusSchema,
  quality: LeadQualitySchema,
  score: z.number().int().min(0).max(100),
  notes: z.string().max(5000).optional(),
  tags: z.array(z.string().max(50)).max(20).optional(),
  assignedTo: UuidSchema.optional(),
  campaignId: UuidSchema.optional(),
  utmSource: z.string().max(100).optional(),
  utmMedium: z.string().max(100).optional(),
  utmCampaign: z.string().max(150).optional(),
  country: z.string().length(2).optional(),
  city: z.string().max(100).optional(),
  convertedAt: z.string().datetime().optional(),
  lostAt: z.string().datetime().optional(),
  lostReason: z.string().max(500).optional(),
});

export const LeadPublicSchema = LeadSchema.pick({
  id: true,
  name: true,
  email: true,
  phone: true,
  source: true,
  status: true,
  quality: true,
  score: true,
  createdAt: true,
});

export const LeadSummarySchema = LeadSchema.pick({
  id: true,
  name: true,
  email: true,
  status: true,
  quality: true,
  score: true,
});

export const LeadCreateInputSchema = z
  .object({
    name: z.string().trim().min(1).max(150),
    email: EmailSchema.optional(),
    phone: PhoneSchema.optional(),
    company: z.string().max(200).optional(),
    jobTitle: z.string().max(150).optional(),
    source: LeadSourceSchema,
    notes: z.string().max(5000).optional(),
    tags: z.array(z.string().max(50)).max(20).optional(),
    utmSource: z.string().max(100).optional(),
    utmMedium: z.string().max(100).optional(),
    utmCampaign: z.string().max(150).optional(),
  })
  .strict()
  .refine((data) => data.email !== undefined || data.phone !== undefined, {
    message: 'Either email or phone is required',
  });

export const LeadListFilterSchema = z.object({
  status: LeadStatusSchema.optional(),
  quality: LeadQualitySchema.optional(),
  source: LeadSourceSchema.optional(),
  assignedTo: UuidSchema.optional(),
  campaignId: UuidSchema.optional(),
  minScore: z.number().int().min(0).max(100).optional(),
  search: z.string().max(200).optional(),
});

export type LeadSchemaType = z.infer<typeof LeadSchema>;
export type LeadPublicSchemaType = z.infer<typeof LeadPublicSchema>;
export type LeadSummarySchemaType = z.infer<typeof LeadSummarySchema>;
export type LeadCreateInputSchemaType = z.infer<typeof LeadCreateInputSchema>;
export type LeadListFilterSchemaType = z.infer<typeof LeadListFilterSchema>;
