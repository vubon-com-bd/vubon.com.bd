export const NOTIFICATION_ACTION = {
  VIEW: 'view',
  OPEN: 'open',
  CLOSE: 'close',
  DISMISS: 'dismiss',
  ACCEPT: 'accept',
  REJECT: 'reject',
  CONFIRM: 'confirm',
  CANCEL: 'cancel',
  REPLY: 'reply',
  FORWARD: 'forward',
  MARK_READ: 'mark_read',
  MARK_UNREAD: 'mark_unread',
  ARCHIVE: 'archive',
  DELETE: 'delete',
  SNOOZE: 'snooze',
  STAR: 'star',
  UNSTAR: 'unstar',
  UNSUBSCRIBE: 'unsubscribe',
  RETRY: 'retry',
  CLICK: 'click',
} as const;

export const NOTIFICATION_ACTION_TYPE = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  DANGER: 'danger',
  LINK: 'link',
  BUTTON: 'button',
} as const;

export type NotificationActionType = (typeof NOTIFICATION_ACTION)[keyof typeof NOTIFICATION_ACTION];
export type NotificationActionTypeType =
  (typeof NOTIFICATION_ACTION_TYPE)[keyof typeof NOTIFICATION_ACTION_TYPE];
