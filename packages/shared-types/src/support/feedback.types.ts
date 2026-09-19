/**
 * Feedback Types
 * @module shared-types/support
 */

import type { FEEDBACK_TYPE, FEEDBACK_STATUS } from '@vubon/shared-constants/support';
import type { BaseEntity } from '../common/base';
import type { UserId } from '../common/primitives';

export type FeedbackTypeValue = (typeof FEEDBACK_TYPE)[keyof typeof FEEDBACK_TYPE];

export type FeedbackStatusValue = (typeof FEEDBACK_STATUS)[keyof typeof FEEDBACK_STATUS];

export interface Feedback extends BaseEntity<string> {
  readonly type: FeedbackTypeValue;
  readonly status: FeedbackStatusValue;
  readonly title?: string;
  readonly message: string;
  readonly rating?: number;
  readonly attachments?: readonly string[];
  readonly userId?: UserId;
  readonly email?: string;
  readonly isAnonymous: boolean;
  readonly tags?: readonly string[];
  readonly referenceId?: string;
  readonly referenceType?: string;
  readonly reviewedBy?: UserId;
  readonly reviewedAt?: string;
  readonly resolvedAt?: string;
}

export interface FeedbackPublic {
  readonly id: string;
  readonly type: FeedbackTypeValue;
  readonly status: FeedbackStatusValue;
  readonly title?: string;
  readonly message: string;
  readonly rating?: number;
  readonly isAnonymous: boolean;
  readonly createdAt: string;
}

export interface FeedbackCreateInput {
  readonly type: FeedbackTypeValue;
  readonly title?: string;
  readonly message: string;
  readonly rating?: number;
  readonly attachments?: readonly string[];
  readonly isAnonymous?: boolean;
  readonly referenceId?: string;
  readonly referenceType?: string;
}

export interface FeedbackListFilter {
  readonly type?: FeedbackTypeValue;
  readonly status?: FeedbackStatusValue;
  readonly minRating?: number;
  readonly maxRating?: number;
  readonly isAnonymous?: boolean;
  readonly fromDate?: string;
  readonly toDate?: string;
}
