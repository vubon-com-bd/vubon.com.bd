import { z } from 'zod';
import { PAGE_LAYOUT } from '@vubon/shared-constants/src/content/page-layout.constants';

const pageLayoutTypeKeys = Object.keys(PAGE_LAYOUT.TYPES) as [string, ...string[]];
const pageLayoutWidthKeys = Object.keys(PAGE_LAYOUT.LAYOUT_WIDTHS) as [string, ...string[]];

export const PageLayoutSchema = z.object({
  layout: z.enum(pageLayoutTypeKeys),
  category: z.literal('page_layout'),
  columns: z.number().int().min(1),
  isGrid: z.boolean().default(false),
  isMasonry: z.boolean().default(false),
  width: z.enum(pageLayoutWidthKeys),
});

export const PageLayoutEnumSchema = z.enum(pageLayoutTypeKeys);
