import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { UserSchema } from '../../user/user.schema';
import { ProductSchema } from '../../business/product/product.schema';
import { SearchFilterSchema } from './search-filter.schema';
import { SearchSortSchema } from './search-sort.schema';
import { SearchOperatorSchema } from './search-operator.schema';
import { SearchMatchSchema } from './search-match.schema';
import { SearchBoostSchema } from './search-boost.schema';
import { PLATFORM_SEARCH } from '@vubon/shared-constants/src/platform/search/search.constants';

const searchTypeKeys = Object.keys(PLATFORM_SEARCH.SEARCH_TYPES) as [string, ...string[]];
const searchStatusKeys = Object.keys(PLATFORM_SEARCH.STATUS) as [string, ...string[]];

export const PlatformSearchSchema = BaseSchema.extend({
  searchId: z.string().uuid(),
  query: z.string().min(1).max(100),
  type: z.enum(searchTypeKeys),
  filters: z.array(SearchFilterSchema),
  sorts: z.array(SearchSortSchema),
  operators: z.array(SearchOperatorSchema),
  matches: z.array(SearchMatchSchema),
  boosts: z.array(SearchBoostSchema),
  results: z.array(ProductSchema),
  resultCount: z.number().int().min(0).default(0),
  totalResults: z.number().int().min(0).default(0),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  took: z.number().min(0),
  userId: z.string().uuid().optional(),
  user: UserSchema.optional(),
  status: z.enum(searchStatusKeys),
  isActive: z.boolean().default(true),
  metadata: z.object({
    ipAddress: z.string().optional(),
    userAgent: z.string().optional(),
    deviceId: z.string().optional(),
    sessionId: z.string().optional(),
    location: z.string().optional(),
    language: z.string().optional(),
    timezone: z.string().optional(),
  }),
});

export const PlatformSearchCreateSchema = PlatformSearchSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  resultCount: true,
  totalResults: true,
  took: true,
});

export const PlatformSearchUpdateSchema = PlatformSearchCreateSchema.partial();
