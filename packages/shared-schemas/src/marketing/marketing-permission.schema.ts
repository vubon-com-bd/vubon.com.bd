import { z } from 'zod';
import { PermissionSchema } from '../common/permission.schema';
import { MARKETING_PERMISSION } from '@vubon/shared-constants/src/marketing/marketing-permission.constants';

const marketingPermissionKeys = Object.keys(MARKETING_PERMISSION) as [string, ...string[]];

export const MarketingPermissionSchema = PermissionSchema.extend({
  permission: z.enum(marketingPermissionKeys),
  category: z.literal('marketing'),
  module: z.string(),
  action: z.enum([
    'view',
    'create',
    'update',
    'delete',
    'manage',
    'launch',
    'pause',
    'analyze',
    'optimize',
  ]),
});

export const MarketingPermissionEnumSchema = z.enum(marketingPermissionKeys);
