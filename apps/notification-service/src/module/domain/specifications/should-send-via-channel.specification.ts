/**
 * ShouldSendViaChannelSpecification
 * @module notification-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { NotificationEntity } from '../entities/notification.entity.js';
import type { PreferenceEntity } from '../entities/preference.entity.js';
import type { DeviceEntity } from '../entities/device.entity.js';

export interface ChannelGateContext {
  readonly preference?: PreferenceEntity | null;
  readonly device?: DeviceEntity | null;
}

export class ShouldSendViaChannelSpecification extends Specification<{
  notification: NotificationEntity;
  ctx?: ChannelGateContext;
}> {
  isSatisfiedBy(c: {
    notification: NotificationEntity;
    ctx?: ChannelGateContext;
  }): boolean {
    const { notification, ctx } = c;
    const channel = notification.channel;

    if (channel.requiresDeviceToken()) {
      if (!ctx?.device) return false;
      if (!ctx.device.canReceivePush()) return false;
    }

    if (channel.requiresEmail() && !notification.recipient.hasEmail()) {
      return false;
    }

    if (channel.requiresPhone() && !notification.recipient.hasPhone()) {
      return false;
    }

    if (ctx?.preference && !ctx.preference.isChannelEnabled(channel.value)) {
      return false;
    }

    return true;
  }

  explain(c: {
    notification: NotificationEntity;
    ctx?: ChannelGateContext;
  }): string | null {
    const { notification, ctx } = c;
    const channel = notification.channel;

    if (channel.requiresDeviceToken()) {
      if (!ctx?.device) return 'no device registered for push';
      if (!ctx.device.canReceivePush()) {
        return `device status "${ctx.device.status.value}" cannot receive push`;
      }
    }
    if (channel.requiresEmail() && !notification.recipient.hasEmail()) {
      return 'recipient has no email address';
    }
    if (channel.requiresPhone() && !notification.recipient.hasPhone()) {
      return 'recipient has no phone number';
    }
    if (ctx?.preference && !ctx.preference.isChannelEnabled(channel.value)) {
      return `channel "${channel.value}" disabled by user preference`;
    }
    return null;
  }
}
