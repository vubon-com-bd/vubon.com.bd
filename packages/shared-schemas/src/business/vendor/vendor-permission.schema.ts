import { z } from 'zod';
import { PermissionSchema } from '../../common/permission.schema';
import { VENDOR_PERMISSION } from '@vubon/shared-constants/src/business/vendor/vendor-permission.constants';

const vendorPermissionKeys = Object.keys(VENDOR_PERMISSION) as [string, ...string[]];

export const VendorPermissionSchema = PermissionSchema.extend({
  permission: z.enum(vendorPermissionKeys),
  category: z.literal('vendor'),
  module: z.string(),
  action: z.enum(['view', 'create', 'update', 'delete', 'manage']),
});

export const VendorPermissionEnumSchema = z.enum(vendorPermissionKeys);
