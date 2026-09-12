import { StatusObject } from '../common/status.types';
import { WEBINAR_STATUS } from '@vubon/shared-constants/src/content/webinar-status.constants';

export interface WebinarStatus extends StatusObject {
  type: keyof typeof WEBINAR_STATUS | string;
  category: 'webinar';
  isDraft: boolean;
  isScheduled: boolean;
  isLive: boolean;
  isEnded: boolean;
  isRecorded: boolean;
  isCancelled: boolean;
  isArchived: boolean;
}

export type WebinarStatusKey = keyof typeof WEBINAR_STATUS;
