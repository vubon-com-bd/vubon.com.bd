import { BaseEntity } from '../common/base.types';
import { User } from '../user/user.types';
import { WEBINAR_STATUS } from '@vubon/shared-constants/src/content/webinar-status.constants';
import { WEBINAR } from '@vubon/shared-constants/src/content/webinar.constants';
import { Media } from './media.types';

export interface WebinarSpeaker {
  name: string;
  title: string;
  avatar?: string;
  bio?: string;
}

export interface WebinarAgendaItem {
  time: string;
  title: string;
  description?: string;
  speaker?: string;
}

export interface WebinarMetadata {
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  tags: string[];
  speakers: WebinarSpeaker[];
  agenda: WebinarAgendaItem[];
}

export interface Webinar extends BaseEntity {
  webinarId: string;
  title: string;
  slug: string;
  description?: string;
  status: keyof typeof WEBINAR_STATUS | string;
  type: keyof typeof WEBINAR.WEBINAR_TYPES | string;
  hostId: string;
  host: User;
  featuredImage?: string;
  videoUrl?: string;
  recordingUrl?: string;
  duration: number;
  maxAttendees: number;
  registeredAttendees: number;
  actualAttendees: number;
  media?: Media;
  viewCount: number;
  likeCount: number;
  shareCount: number;
  isFeatured: boolean;
  isPublished: boolean;
  isLive: boolean;
  startsAt: Date;
  endsAt: Date;
  publishedAt?: Date;
  metadata: WebinarMetadata;
}
