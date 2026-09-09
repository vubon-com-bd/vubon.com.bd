import { z } from 'zod';
import { STATUS } from '@vubon/shared-constants/src/common/status.constants';

const statusKeys = Object.keys(STATUS) as [string, ...string[]];

export const StatusSchema = z.object({
  status: z.enum(statusKeys),
});

export const StatusEnumSchema = z.enum(statusKeys);
