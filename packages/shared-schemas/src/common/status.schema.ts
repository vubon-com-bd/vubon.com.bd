import { z } from 'zod';
import { STATUS } from '@vubon/shared-constants';

export const StatusSchema = z.object({
  status: z.enum(Object.keys(STATUS) as [string, ...string[]]),
});

export const StatusEnumSchema = z.enum(Object.keys(STATUS) as [string, ...string[]]);
