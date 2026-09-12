import { StatusObject } from '../common/status.types';
import { NEWSLETTER_STATUS } from '@vubon/shared-constants/src/content/newsletter-status.constants';

export interface NewsletterStatus extends StatusObject {
  type: keyof typeof NEWSLETTER_STATUS | string;
  category: 'newsletter';
  isDraft: boolean;
  isScheduled: boolean;
  isSending: boolean;
  isSent: boolean;
  isFailed: boolean;
  isCancelled: boolean;
}

export type NewsletterStatusKey = keyof typeof NEWSLETTER_STATUS;
