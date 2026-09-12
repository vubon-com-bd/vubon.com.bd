import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { CONTENT_ERROR } from '@vubon/shared-constants/src/content/content-error.constants';

const contentErrorTypeKeys = Object.keys(CONTENT_ERROR.TYPES) as [string, ...string[]];

export const ContentErrorSchema = BaseSchema.extend({
  errorId: z.string().uuid(),
  code: z.enum(contentErrorTypeKeys),
  message: z.string(),
  details: z.record(z.unknown()).optional(),
  stack: z.string().optional(),
  timestamp: z.date(),
  resolvedAt: z.date().optional(),
  resolvedBy: z.string().optional(),
  resolution: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const ContentErrorEnumSchema = z.enum(contentErrorTypeKeys);
