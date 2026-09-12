import { z } from 'zod';
import { STATUS } from '@vubon/shared-constants/src/common/status.constants';

/**
 * Flat status values only.
 * STATUS contains nested objects (ORDER, PAYMENT, ...) — Object.keys would
 * return the nested object keys, which is not what we want here.
 */
const statusValues = [
  STATUS.ACTIVE,
  STATUS.INACTIVE,
  STATUS.PENDING,
  STATUS.DRAFT,
  STATUS.ARCHIVED,
  STATUS.DELETED,
  STATUS.BLOCKED,
  STATUS.SUSPENDED,
] as [string, ...string[]];

export const StatusSchema = z.object({
  status: z.enum(statusValues),
});

export const StatusEnumSchema = z.enum(statusValues);
