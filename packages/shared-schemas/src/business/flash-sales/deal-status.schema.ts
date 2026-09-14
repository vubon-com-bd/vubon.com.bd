/**
 * Deal Status Schema
 * @module shared-schemas/business/flash-sales
 */

import { z } from 'zod';
import { DEAL_STATUS } from '@vubon/shared-constants/business';

export const DealStatusSchema = z.enum(Object.values(DEAL_STATUS) as [string, ...string[]]);

export type DealStatusSchemaType = z.infer<typeof DealStatusSchema>;
