import { STATUS as COMMON_STATUS } from '../../common/status.constants';

export const NOTIFICATION_READ_STATUS = {
  ...COMMON_STATUS,
  UNREAD: 'unread',
  READ: 'read',
  ARCHIVED: 'archived',
  DISMISSED: 'dismissed',
} as const;
