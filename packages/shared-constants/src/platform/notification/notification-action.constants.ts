import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const NOTIFICATION_ACTION = {
  TYPES: {
    ...COMMON_TYPES,
    VIEW: 'view',
    OPEN: 'open',
    CLICK: 'click',
    DISMISS: 'dismiss',
    ARCHIVE: 'archive',
    DELETE: 'delete',
    REPLY: 'reply',
    FORWARD: 'forward',
    SHARE: 'share',
    SAVE: 'save',
    REPORT: 'report',
  },
  ACTION_HANDLERS: {
    VIEW: 'view_handler',
    OPEN: 'open_handler',
    CLICK: 'click_handler',
    DISMISS: 'dismiss_handler',
  },
} as const;
