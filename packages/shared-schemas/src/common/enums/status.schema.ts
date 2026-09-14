/**
 * Status Schema
 * @module shared-schemas/common/enums
 *
 * Values আসে shared-constants/common/status.constants থেকে।
 */

import { z } from 'zod';
import { STATUS } from '@vubon/shared-constants/common';

export const StatusSchema = z.enum(Object.values(STATUS) as [string, ...string[]]);

export type StatusSchemaType = z.infer<typeof StatusSchema>;
