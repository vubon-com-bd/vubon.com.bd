import { STATUS as COMMON_STATUS } from '../common/status.constants';

export const GALLERY_STATUS = {
  ...COMMON_STATUS,
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  ARCHIVED: 'archived',
} as const;
