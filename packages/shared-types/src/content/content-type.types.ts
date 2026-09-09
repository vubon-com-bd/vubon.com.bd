import { TypeObject } from '../common/types.types';
import { CONTENT_TYPE } from '@vubon/shared-constants/src/content/content-type.constants';

export interface ContentType extends TypeObject {
  type: keyof typeof CONTENT_TYPE | string;
  category: 'content';
  isBlog: boolean;
  isPage: boolean;
  isMedia: boolean;
  isGallery: boolean;
  isAnnouncement: boolean;
  isNewsletter: boolean;
  isTestimonial: boolean;
  isFaq: boolean;
  isGuide: boolean;
  isCaseStudy: boolean;
  isWhitePaper: boolean;
  isEBook: boolean;
  isVideo: boolean;
  isPodcast: boolean;
  isWebinar: boolean;
}

export type ContentTypeKey = keyof typeof CONTENT_TYPE;
