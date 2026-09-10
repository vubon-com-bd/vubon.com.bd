import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { FACET } from '@vubon/shared-constants/src/platform/search/facet.constants';

const facetTypeKeys = Object.keys(FACET.TYPES) as [string, ...string[]];
const facetFacetTypeKeys = Object.keys(FACET.FACET_TYPES) as [string, ...string[]];
const facetSortKeys = Object.keys(FACET.FACET_SORT) as [string, ...string[]];

export const FacetSchema = BaseSchema.extend({
  facetId: z.string().uuid(),
  type: z.enum(facetTypeKeys),
  name: z.string().min(1).max(100),
  field: z.string(),
  facetType: z.enum(facetFacetTypeKeys),
  sort: z.enum(facetSortKeys),
  values: z.array(
    z.object({
      value: z.string(),
      count: z.number().int().min(0),
      isSelected: z.boolean().default(false),
    })
  ),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
