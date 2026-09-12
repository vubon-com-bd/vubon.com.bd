import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { UserSchema } from '../user/user.schema';
import { E_BOOK_STATUS } from '@vubon/shared-constants/src/content/e-book-status.constants';
import { E_BOOK } from '@vubon/shared-constants/src/content/e-book.constants';

const eBookStatusKeys = Object.keys(E_BOOK_STATUS) as [string, ...string[]];
const eBookTypeKeys = Object.keys(E_BOOK.E_BOOK_TYPES) as [string, ...string[]];

export const EBookSchema = BaseSchema.extend({
  ebookId: z.string().uuid(),
  title: z.string().min(1).max(255),
  slug: z
    .string()
    .min(1)
    .max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  content: z.string().min(10).max(100000),
  status: z.enum(eBookStatusKeys),
  type: z.enum(eBookTypeKeys),
  authorId: z.string().uuid(),
  author: UserSchema,
  featuredImage: z.string().url().optional(),
  pdfUrl: z.string().url().optional(),
  epubUrl: z.string().url().optional(),
  mobiUrl: z.string().url().optional(),
  pageCount: z.number().int().min(0).default(0),
  wordCount: z.number().int().min(0).default(0),
  viewCount: z.number().int().min(0).default(0),
  downloadCount: z.number().int().min(0).default(0),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  publishedAt: z.date().optional(),
  metadata: z
    .object({
      seoTitle: z.string().max(60).optional(),
      seoDescription: z.string().max(160).optional(),
      seoKeywords: z.array(z.string()).optional(),
      isbn: z.string().optional(),
      publisher: z.string().optional(),
      edition: z.number().int().min(1).optional(),
      copyrightYear: z.number().int().min(1900).optional(),
    })
    .optional(),
});
