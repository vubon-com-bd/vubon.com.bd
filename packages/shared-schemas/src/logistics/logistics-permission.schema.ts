import { z } from 'zod';
import { PermissionSchema } from '../common/permission.schema';
import { LOGISTICS_PERMISSION } from '@vubon/shared-constants/src/logistics/logistics-permission.constants';

const logisticsPermissionKeys = Object.keys(LOGISTICS_PERMISSION) as [string, ...string[]];

export const LogisticsPermissionSchema = PermissionSchema.extend({
  permission: z.enum(logisticsPermissionKeys),
  category: z.literal('logistics'),
  module: z.string(),
  action: z.enum([
    'view',
    'create',
    'update',
    'delete',
    'manage',
    'assign',
    'track',
    'dispatch',
    'complete',
  ]),
});

export const LogisticsPermissionEnumSchema = z.enum(logisticsPermissionKeys);
