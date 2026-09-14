/**
 * Knowledge Base Schema
 * @module shared-schemas/support
 *
 * Values আসে shared-constants/support/knowledge-base.constants থেকে।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema';
import { SlugSchema } from '../common/primitives/slug.schema';
import {
  KNOWLEDGE_BASE_STATUS,
  KNOWLEDGE_BASE_TYPE,
  KNOWLEDGE_BASE_VISIBILITY,
  KNOWLEDGE_BASE,
} from '@vubon/shared-constants/support';

export const KnowledgeBaseStatusSchema = z.enum(
  Object.values(KNOWLEDGE_BASE_STATUS) as [string, ...string[]]
);

export const KnowledgeBaseTypeSchema = z.enum(
  Object.values(KNOWLEDGE_BASE_TYPE) as [string, ...string[]]
);

export const KnowledgeBaseVisibilitySchema = z.enum(
  Object.values(KNOWLEDGE_BASE_VISIBILITY) as [string, ...string[]]
);

export const KnowledgeBaseSchema = BaseEntitySchema.extend({
  title: z.string().trim().min(1).max(KNOWLEDGE_BASE.TITLE_MAX_LENGTH),
  slug: SlugSchema,
  summary: z.string().max(KNOWLEDGE_BASE.SUMMARY_MAX_LENGTH).optional(),
  content: z.string().trim().min(1).max(KNOWLEDGE_BASE.CONTENT_MAX_LENGTH),
  type: KnowledgeBaseTypeSchema,
  status: KnowledgeBaseStatusSchema,
  visibility: KnowledgeBaseVisibilitySchema,
  categoryIds: z.array(z.string().min(1)).max(KNOWLEDGE_BASE.MAX_CATEGORIES),
  tags: z.array(z.string().max(50)).max(KNOWLEDGE_BASE.MAX_TAGS).optional(),
  attachments: z.array(z.string().url()).max(KNOWLEDGE_BASE.MAX_ATTACHMENTS).optional(),
  viewCount: z.number().int().nonnegative(),
  helpfulCount: z.number().int().nonnegative(),
  notHelpfulCount: z.number().int().nonnegative(),
  version: z.number().int().positive(),
  reviewAt: z.string().datetime().optional(),
  reviewedBy: z.string().optional(),
  publishedAt: z.string().datetime().optional(),
  createdBy: z.string().min(1),
  updatedBy: z.string().optional(),
});

export const KnowledgeBasePublicSchema = KnowledgeBaseSchema.pick({
  id: true,
  title: true,
  slug: true,
  summary: true,
  type: true,
  viewCount: true,
  publishedAt: true,
});

export const KnowledgeBaseListFilterSchema = z.object({
  type: KnowledgeBaseTypeSchema.optional(),
  status: KnowledgeBaseStatusSchema.optional(),
  visibility: KnowledgeBaseVisibilitySchema.optional(),
  categoryId: z.string().optional(),
  tags: z.array(z.string().max(50)).max(20).optional(),
  search: z.string().max(200).optional(),
});

export type KnowledgeBaseStatusSchemaType = z.infer<typeof KnowledgeBaseStatusSchema>;
export type KnowledgeBaseTypeSchemaType = z.infer<typeof KnowledgeBaseTypeSchema>;
export type KnowledgeBaseVisibilitySchemaType = z.infer<typeof KnowledgeBaseVisibilitySchema>;
export type KnowledgeBaseSchemaType = z.infer<typeof KnowledgeBaseSchema>;
export type KnowledgeBasePublicSchemaType = z.infer<typeof KnowledgeBasePublicSchema>;
export type KnowledgeBaseListFilterSchemaType = z.infer<typeof KnowledgeBaseListFilterSchema>;
