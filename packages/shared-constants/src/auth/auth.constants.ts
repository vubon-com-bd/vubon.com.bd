import { STATUS } from '../common/status.constants';
import { ROLES } from '../common/roles.constants';
import { PERMISSIONS } from '../common/permissions.constants';
import { SESSION } from '../common/session.constants';
import { DEVICE } from '../common/device.constants';

export const AUTH = {
  STATUS,
  ROLES,
  PERMISSIONS,
  SESSION,
  DEVICE,
} as const;
