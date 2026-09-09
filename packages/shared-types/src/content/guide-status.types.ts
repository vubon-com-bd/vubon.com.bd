import { StatusObject } from '../common/status.types';
import { GUIDE_STATUS } from '@vubon/shared-constants/src/content/guide-status.constants';

export interface GuideStatus extends StatusObject {
  type: keyof typeof GUIDE_STATUS | string;
  category: 'guide';
  isDraft: boolean;
  isPublished: boolean;
  isUpdated: boolean;
  isArchived: boolean;
}

export type GuideStatusKey = keyof typeof GUIDE_STATUS;
