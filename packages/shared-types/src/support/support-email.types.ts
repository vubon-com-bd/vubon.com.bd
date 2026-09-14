/**
 * Support Email Types
 * @module shared-types/support
 */

import type { Email } from '../common/primitives';
import type { BaseEntity } from '../common/base';

export type SupportEmailStatusValue =
  'pending' | 'queued' | 'sent' | 'delivered' | 'failed' | 'bounced' | 'opened' | 'clicked';

export interface SupportEmail extends BaseEntity<string> {
  readonly ticketId?: string;
  readonly to: readonly Email[];
  readonly cc?: readonly Email[];
  readonly bcc?: readonly Email[];
  readonly from: Email;
  readonly replyTo?: Email;
  readonly subject: string;
  readonly body: string;
  readonly bodyHtml?: string;
  readonly templateId?: string;
  readonly status: SupportEmailStatusValue;
  readonly sentAt?: string;
  readonly deliveredAt?: string;
  readonly openedAt?: string;
  readonly clickedAt?: string;
  readonly failureReason?: string;
}

export interface SupportEmailPublic {
  readonly id: string;
  readonly to: readonly Email[];
  readonly subject: string;
  readonly status: SupportEmailStatusValue;
  readonly sentAt?: string;
}
