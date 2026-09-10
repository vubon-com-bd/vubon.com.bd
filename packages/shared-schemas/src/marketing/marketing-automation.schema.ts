import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { CampaignSchema } from './campaign.schema';
import { MARKETING_AUTOMATION } from '@vubon/shared-constants/src/marketing/marketing-automation.constants';

const marketingAutomationStatusKeys = Object.keys(MARKETING_AUTOMATION.STATUS) as [
  string,
  ...string[],
];
const marketingAutomationTypeKeys = Object.keys(MARKETING_AUTOMATION.TYPES) as [
  string,
  ...string[],
];
const marketingAutomationTriggerKeys = Object.keys(MARKETING_AUTOMATION.TRIGGER_TYPES) as [
  string,
  ...string[],
];
const marketingAutomationExecutionKeys = Object.keys(MARKETING_AUTOMATION.EXECUTION_TIMES) as [
  string,
  ...string[],
];

export const MarketingAutomationSchema = BaseSchema.extend({
  automationId: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  status: z.enum(marketingAutomationStatusKeys),
  type: z.enum(marketingAutomationTypeKeys),
  trigger: z.enum(marketingAutomationTriggerKeys),
  executionTime: z.enum(marketingAutomationExecutionKeys),
  campaignId: z.string().uuid().optional(),
  campaign: CampaignSchema.optional(),
  conditions: z.array(
    z.object({
      field: z.string(),
      operator: z.enum([
        'eq',
        'ne',
        'gt',
        'gte',
        'lt',
        'lte',
        'contains',
        'starts_with',
        'ends_with',
        'in',
        'not_in',
      ]),
      value: z.unknown(),
    })
  ),
  actions: z.array(
    z.object({
      type: z.string(),
      value: z.unknown(),
    })
  ),
  isActive: z.boolean().default(true),
  isError: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
