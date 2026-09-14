/**
 * Support SMS Types
 * @module shared-types/support
 */

import type { Phone } from '../common/primitives';
import type { BaseEntity } from '../common/base';

export type SupportSmsStatusValue = 'pending' | 'queued' | 'sent' | 'delivered' | 'failed';

export interface SupportSms extends BaseEntity<string> {
  readonly ticketId?: string;
  readonly to: Phone;
  readonly from?: string;
  readonly message: string;
  readonly status: SupportSmsStatusValue;
  readonly segments: number;
  readonly sentAt?: string;
  readonly deliveredAt?: string;
  readonly failureReason?: string;
}

export interface SupportSmsPublic {
  readonly id: string;
  readonly to: Phone;
  readonly message: string;
  readonly status: SupportSmsStatusValue;
  readonly sentAt?: string;
}
