import { BaseEntity } from '../common/base.types';
import { METRICS } from '@vubon/shared-constants/src/common/types.constants';
import { User } from './user.types';

export interface BusinessUserAnalytics extends BaseEntity {
  analyticsId: string;
  userId: string;
  user: User;
  metric: keyof typeof METRICS | string;
  value: number;
  timestamp: Date;
  metadata: Record<string, unknown>;
}
