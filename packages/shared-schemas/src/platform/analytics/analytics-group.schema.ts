import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { ANALYTICS_GROUP } from '@vubon/shared-constants/src/platform/analytics/analytics-group.constants';

const analyticsGroupTypeKeys = Object.keys(ANALYTICS_GROUP.TYPES) as [string, ...string[]];
const analyticsGroupOperationKeys = Object.keys(ANALYTICS_GROUP.GROUP_OPERATIONS) as [
  string,
  ...string[],
];

export const AnalyticsGroupSchema = BaseSchema.extend({
  groupId: z.string().uuid(),
  analyticsId: z.string().uuid(),
  type: z.enum(analyticsGroupTypeKeys),
  fields: z.array(z.string()),
  operation: z.enum(analyticsGroupOperationKeys),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
