import { TypeObject } from '../../common/types.types';
import { ANALYTICS_GROUP } from '@vubon/shared-constants/src/platform/analytics/analytics-group.constants';
import { Analytics } from './analytics.types';

export interface AnalyticsGroup extends TypeObject {
  groupId: string;
  analyticsId: string;
  analytics: Analytics;
  type: keyof typeof ANALYTICS_GROUP.TYPES | string;
  fields: string[];
  operation: keyof typeof ANALYTICS_GROUP.GROUP_OPERATIONS | string;
  isActive: boolean;
  metadata: Record<string, unknown>;
}

export type AnalyticsGroupKey = keyof typeof ANALYTICS_GROUP.TYPES;
