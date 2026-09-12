import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { SEO_STRATEGY } from '@vubon/shared-constants/src/platform/seo/seo-strategy.constants';

const strategyTypeKeys = Object.keys(SEO_STRATEGY.TYPES) as [string, ...string[]];
const strategyGoalKeys = Object.keys(SEO_STRATEGY.STRATEGY_GOALS) as [string, ...string[]];
const strategyPriorityKeys = Object.keys(SEO_STRATEGY.STRATEGY_PRIORITIES) as [string, ...string[]];

export const SEOStrategySchema = BaseSchema.extend({
  strategyId: z.string().uuid(),
  seoId: z.string().uuid(),
  type: z.enum(strategyTypeKeys),
  goal: z.enum(strategyGoalKeys),
  priority: z.enum(strategyPriorityKeys),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  duration: z.number().int().min(1),
  startDate: z.date(),
  endDate: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
