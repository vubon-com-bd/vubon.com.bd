/**
 * Flash Sale Type Schema
 * @module shared-schemas/business/flash-sales
 */

import { z } from 'zod';
import { FLASH_SALE_TYPE } from '@vubon/shared-constants/business';

export const FlashSaleTypeSchema = z.enum(Object.values(FLASH_SALE_TYPE) as [string, ...string[]]);

export type FlashSaleTypeSchemaType = z.infer<typeof FlashSaleTypeSchema>;
