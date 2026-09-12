import { TypeObject } from '../../common/types.types';
import { NOTIFICATION_CHANNEL } from '@vubon/shared-constants/src/platform/notification/notification-channel.constants';

export interface NotificationChannel extends TypeObject {
  type: keyof typeof NOTIFICATION_CHANNEL.TYPES | string;
  category: 'notification_channel';
  priority: keyof typeof NOTIFICATION_CHANNEL.CHANNEL_PRIORITIES | string;
  isEmail: boolean;
  isSms: boolean;
  isPush: boolean;
  isInApp: boolean;
  isWebhook: boolean;
  isWhatsApp: boolean;
  isMessenger: boolean;
  isTelegram: boolean;
  isSlack: boolean;
  isDiscord: boolean;
}

export type NotificationChannelKey = keyof typeof NOTIFICATION_CHANNEL.TYPES;
