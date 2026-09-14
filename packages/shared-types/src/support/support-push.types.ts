/**
 * Support Push Notification Types
 * @module shared-types/support
 */

import type { UserId } from '../common/primitives';
import type { BaseEntity } from '../common/base';

export type SupportPushStatusValue = 'pending' | 'queued' | 'sent' | 'delivered' | 'failed';

export interface SupportPush extends BaseEntity<string> {
  readonly ticketId?: string;
  readonly userId: UserId;
  readonly title: string;
  readonly body: string;
  readonly data?: Readonly<Record<string, unknown>>;
  readonly status: SupportPushStatusValue;
  readonly sentAt?: string;
  readonly deliveredAt?: string;
  readonly failureReason?: string;
}

export interface SupportPushPublic {
  readonly id: string;
  readonly userId: UserId;
  readonly title: string;
  readonly body: string;
  readonly status: SupportPushStatusValue;
  readonly sentAt?: string;
}
