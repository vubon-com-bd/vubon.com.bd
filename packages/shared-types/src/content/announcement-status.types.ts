import { StatusObject } from '../common/status.types';
import { ANNOUNCEMENT_STATUS } from '@vubon/shared-constants/src/content/announcement-status.constants';

export interface AnnouncementStatus extends StatusObject {
  type: keyof typeof ANNOUNCEMENT_STATUS | string;
  category: 'announcement';
  isDraft: boolean;
  isPublished: boolean;
  isExpired: boolean;
  isArchived: boolean;
}

export type AnnouncementStatusKey = keyof typeof ANNOUNCEMENT_STATUS;
