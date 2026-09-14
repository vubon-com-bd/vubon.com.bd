/**
 * Data Type Schema
 * @module shared-schemas/common/enums
 */

import { z } from 'zod';
import { DATA_TYPE } from '@vubon/shared-constants/common';

export const DataTypeSchema = z.enum(Object.values(DATA_TYPE) as [string, ...string[]]);

export type DataTypeSchemaType = z.infer<typeof DataTypeSchema>;
