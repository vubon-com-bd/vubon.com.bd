import { StatusObject } from '../common/status.types';
import { PODCAST_STATUS } from '@vubon/shared-constants/src/content/podcast-status.constants';

export interface PodcastStatus extends StatusObject {
  type: keyof typeof PODCAST_STATUS | string;
  category: 'podcast';
  isDraft: boolean;
  isPublished: boolean;
  isArchived: boolean;
}

export type PodcastStatusKey = keyof typeof PODCAST_STATUS;
