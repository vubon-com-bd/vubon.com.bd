import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { NotificationChannelVO } from '../value-objects/primitives/notification-channel.vo';

export class UnsubscribeService {
  generateToken(userId: UserIdVO, channel: NotificationChannelVO): string {
    // In real impl: HMAC-signed token
    return `unsub_${userId.value}_${channel.value}`;
  }

  isValidToken(userId: UserIdVO, channel: NotificationChannelVO, token: string): boolean {
    return token === this.generateToken(userId, channel);
  }
}
