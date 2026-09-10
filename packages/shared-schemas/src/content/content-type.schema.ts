import { z } from 'zod';
import { CONTENT_TYPE } from '@vubon/shared-constants/src/content/content-type.constants';

const contentTypeKeys = Object.keys(CONTENT_TYPE) as [string, ...string[]];

export const ContentTypeSchema = z.object({
  type: z.enum(contentTypeKeys),
  category: z.literal('content'),
  isBlog: z.boolean().default(false),
  isPage: z.boolean().default(false),
  isMedia: z.boolean().default(false),
  isGallery: z.boolean().default(false),
  isAnnouncement: z.boolean().default(false),
  isNewsletter: z.boolean().default(false),
  isTestimonial: z.boolean().default(false),
  isFaq: z.boolean().default(false),
  isGuide: z.boolean().default(false),
  isCaseStudy: z.boolean().default(false),
  isWhitePaper: z.boolean().default(false),
  isEBook: z.boolean().default(false),
  isVideo: z.boolean().default(false),
  isPodcast: z.boolean().default(false),
  isWebinar: z.boolean().default(false),
});

export const ContentTypeEnumSchema = z.enum(contentTypeKeys);
