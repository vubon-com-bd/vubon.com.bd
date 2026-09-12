import { z } from 'zod';
import { CONTENT_FORMAT } from '@vubon/shared-constants/src/content/content-format.constants';

const contentFormatTypeKeys = Object.keys(CONTENT_FORMAT.TYPES) as [string, ...string[]];

export const ContentFormatSchema = z.object({
  format: z.enum(contentFormatTypeKeys),
  category: z.literal('content_format'),
  isText: z.boolean().default(false),
  isHtml: z.boolean().default(false),
  isMarkdown: z.boolean().default(false),
  isJson: z.boolean().default(false),
  isXml: z.boolean().default(false),
  isPdf: z.boolean().default(false),
  isDoc: z.boolean().default(false),
  isDocx: z.boolean().default(false),
  isTxt: z.boolean().default(false),
});

export const ContentFormatEnumSchema = z.enum(contentFormatTypeKeys);
