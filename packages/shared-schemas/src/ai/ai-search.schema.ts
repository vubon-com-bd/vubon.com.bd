import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { ProductSchema } from '../business/product/product.schema';
import { AI_SEARCH } from '@vubon/shared-constants/src/ai/ai-search.constants';

const aiSearchTypeKeys = Object.keys(AI_SEARCH.TYPES) as [string, ...string[]];
const semanticSearchModelKeys = Object.keys(AI_SEARCH.SEMANTIC_SEARCH_MODELS) as [
  string,
  ...string[],
];
const vectorSearchDimensionKeys = Object.keys(AI_SEARCH.VECTOR_SEARCH_DIMENSIONS) as [
  string,
  ...string[],
];

export const AISearchSchema = BaseSchema.extend({
  searchId: z.string().uuid(),
  aiId: z.string().uuid(),
  query: z.string().min(1).max(100),
  type: z.enum(aiSearchTypeKeys),
  model: z.enum(semanticSearchModelKeys),
  dimensions: z.enum(vectorSearchDimensionKeys),
  similarityThreshold: z.number().min(0).max(1),
  results: z.array(ProductSchema),
  resultCount: z.number().int().min(0).default(0),
  took: z.number().min(0),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
