import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { REPORT_TEMPLATE } from '@vubon/shared-constants/src/platform/reporting/report-template.constants';

const templateStatusKeys = Object.keys(REPORT_TEMPLATE.STATUS) as [string, ...string[]];
const templateTypeKeys = Object.keys(REPORT_TEMPLATE.TYPES) as [string, ...string[]];
const templateCategoryKeys = Object.keys(REPORT_TEMPLATE.TEMPLATE_CATEGORIES) as [
  string,
  ...string[],
];

export const ReportTemplateSchema = BaseSchema.extend({
  templateId: z.string().uuid(),
  reportId: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  status: z.enum(templateStatusKeys),
  type: z.enum(templateTypeKeys),
  category: z.enum(templateCategoryKeys),
  sections: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
      type: z.enum([
        'header',
        'summary',
        'metrics',
        'charts',
        'tables',
        'analysis',
        'recommendations',
        'footer',
      ]),
      content: z.unknown(),
      order: z.number().int().min(0),
      isVisible: z.boolean().default(true),
    })
  ),
  isActive: z.boolean().default(true),
  isDefault: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
