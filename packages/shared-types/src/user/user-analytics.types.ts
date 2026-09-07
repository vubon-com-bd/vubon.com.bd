import { METRICS } from '@vubon/shared-constants';

export interface UserAnalytics {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  isDeleted: boolean;
  analyticsId: string;
  userId: string;
  metric: keyof typeof METRICS;
  value: number;
  timestamp: Date;
  metadata: Record<string, unknown>;
}
