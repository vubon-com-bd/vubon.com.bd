/**
 * Analytics Event Types
 * @module shared-types/platform/analytics
 */

import type { ANALYTICS_EVENT, ANALYTICS_EVENT_CATEGORY } from '@vubon/shared-constants/platform';
import type { UserId } from '../../common/primitives';

export type AnalyticsEventValue = (typeof ANALYTICS_EVENT)[keyof typeof ANALYTICS_EVENT];

export type AnalyticsEventCategoryValue =
  (typeof ANALYTICS_EVENT_CATEGORY)[keyof typeof ANALYTICS_EVENT_CATEGORY];

export interface AnalyticsEvent {
  readonly id: string;
  readonly name: AnalyticsEventValue;
  readonly category: AnalyticsEventCategoryValue;
  readonly userId?: UserId;
  readonly sessionId?: string;
  readonly properties?: Readonly<Record<string, unknown>>;
  readonly context?: EventContext;
  readonly occurredAt: string;
}

export interface EventContext {
  readonly page?: string;
  readonly referrer?: string;
  readonly device?: string;
  readonly os?: string;
  readonly browser?: string;
  readonly country?: string;
  readonly city?: string;
  readonly ip?: string;
}

export interface AnalyticsEventInput {
  readonly name: AnalyticsEventValue;
  readonly category: AnalyticsEventCategoryValue;
  readonly userId?: UserId;
  readonly properties?: Readonly<Record<string, unknown>>;
}
