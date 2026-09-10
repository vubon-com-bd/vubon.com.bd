import { z } from 'zod';
import { PAGE_TEMPLATE } from '@vubon/shared-constants/src/content/page-template.constants';

const pageTemplateTypeKeys = Object.keys(PAGE_TEMPLATE.TYPES) as [string, ...string[]];
const pageTemplateCategoryKeys = Object.keys(PAGE_TEMPLATE.TEMPLATE_CATEGORIES) as [
  string,
  ...string[],
];

export const PageTemplateSchema = z.object({
  template: z.enum(pageTemplateTypeKeys),
  category: z.enum(pageTemplateCategoryKeys),
  isDefault: z.boolean().default(false),
  isFullWidth: z.boolean().default(false),
  hasSidebar: z.boolean().default(false),
  isLanding: z.boolean().default(false),
});

export const PageTemplateEnumSchema = z.enum(pageTemplateTypeKeys);
