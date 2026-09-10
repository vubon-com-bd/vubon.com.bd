import { z } from 'zod';
import { StatusSchema } from '../common/status.schema';
import { WEBINAR_STATUS } from '@vubon/shared-constants/src/content/webinar-status.constants';

const webinarStatusKeys = Object.keys(WEBINAR_STATUS) as [string, ...string[]];

export const WebinarStatusSchema = StatusSchema.extend({
  status: z.enum(webinarStatusKeys),
  category: z.literal('webinar'),
  isDraft: z.boolean().default(false),
  isScheduled: z.boolean().default(false),
  isLive: z.boolean().default(false),
  isEnded: z.boolean().default(false),
  isRecorded: z.boolean().default(false),
  isCancelled: z.boolean().default(false),
  isArchived: z.boolean().default(false),
});

export const WebinarStatusEnumSchema = z.enum(webinarStatusKeys);
