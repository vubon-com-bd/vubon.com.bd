/**
 * Lead Status Schema
 * @module shared-schemas/marketing
 *
 * Values আসে shared-constants/marketing/lead-generation.constants থেকে।
 */

import { z } from 'zod';
import { LEAD_STATUS, LEAD_QUALITY } from '@vubon/shared-constants/marketing';

export const LeadStatusSchema = z.enum(Object.values(LEAD_STATUS) as [string, ...string[]]);

export const LeadQualitySchema = z.enum(Object.values(LEAD_QUALITY) as [string, ...string[]]);

export type LeadStatusSchemaType = z.infer<typeof LeadStatusSchema>;
export type LeadQualitySchemaType = z.infer<typeof LeadQualitySchema>;
