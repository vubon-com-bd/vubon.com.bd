/**
 * Lead Source Schema
 * @module shared-schemas/marketing
 *
 * Values আসে shared-constants/marketing/lead-generation.constants থেকে।
 */

import { z } from 'zod';
import { LEAD_SOURCE } from '@vubon/shared-constants/marketing';

export const LeadSourceSchema = z.enum(Object.values(LEAD_SOURCE) as [string, ...string[]]);

export type LeadSourceSchemaType = z.infer<typeof LeadSourceSchema>;
