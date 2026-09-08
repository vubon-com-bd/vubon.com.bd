import { STATUS } from '../../common/status.constants';
import { TYPES } from '../../common/types.constants';
import { PERMISSIONS } from '../../common/permissions.constants';

export const PRODUCT = {
  STATUS,
  TYPES,
  PERMISSIONS: {
    ...PERMISSIONS,
    CREATE: 'product:create',
    UPDATE: 'product:update',
    DELETE: 'product:delete',
    VIEW: 'product:view',
  },
} as const;
