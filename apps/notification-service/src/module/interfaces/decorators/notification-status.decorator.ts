/**
 * @NotificationStatus(...statuses) — restrict route to specific statuses
 * @module notification-service/interfaces/decorators
 */
import { SetMetadata } from '@nestjs/common';
import { NOTIFICATION_STATUS } from '@vubon/shared-constants/platform/notification';

export const NOTIFICATION_STATUS_METADATA_KEY = 'notificationStatus';

export const NotificationStatus = (
  ...statuses: readonly (typeof NOTIFICATION_STATUS[keyof typeof NOTIFICATION_STATUS] | string)[]
): MethodDecorator & ClassDecorator =>
  SetMetadata(NOTIFICATION_STATUS_METADATA_KEY, statuses);
