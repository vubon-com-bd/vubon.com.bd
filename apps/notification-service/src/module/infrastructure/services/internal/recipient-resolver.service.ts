/**
 * RecipientResolverService (infrastructure wrapper)
 * @module notification-service/infrastructure/services/internal
 *
 * Resolves recipients from:
 *  - Direct user ID → fetch profile from identity-service
 *  - Broadcast audience → fan out by segment
 *  - Template-based recipients list
 */
import { Injectable, Logger } from '@nestjs/common';

import { UserClient } from '@infrastructure/services/external/user.client.js';
import { NotificationRecipientVO } from '@domain/composites/notification-recipient.vo.js';
import { NotificationChannelVO } from '@domain/primitives/notification-channel.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { EmailAddressVO } from '@domain/primitives/email-address.vo.js';
import { PhoneNumberVO } from '@domain/primitives/phone-number.vo.js';

export interface ResolveRecipientRequest {
  readonly userId: string;
  readonly channel: string;
  readonly deviceToken?: string;
  readonly webhookUrl?: string;
}

export interface ResolvedRecipient {
  readonly recipient: NotificationRecipientVO;
  readonly userProfile?: {
    readonly name?: string;
    readonly locale?: string;
    readonly timezone?: string;
  };
}

@Injectable()
export class RecipientResolverInfraService {
  private readonly logger = new Logger(RecipientResolverInfraService.name);

  constructor(private readonly userClient: UserClient) {}

  async resolve(request: ResolveRecipientRequest): Promise<ResolvedRecipient | null> {
    const profile = await this.userClient.getById(request.userId);
    if (!profile) {
      this.logger.warn(`User ${request.userId} not found — skipping recipient`);
      return null;
    }

    if (!profile.isActive) {
      this.logger.debug(`User ${request.userId} inactive — skipping`);
      return null;
    }

    const userId = UserIdVO.reconstitute(request.userId);
    const channel = NotificationChannelVO.create(request.channel);

    let email: EmailAddressVO | undefined;
    let phone: PhoneNumberVO | undefined;

    if (profile.email) {
      try {
        email = EmailAddressVO.reconstitute(profile.email);
      } catch {
        this.logger.warn(`Invalid email for user ${request.userId}: ${profile.email}`);
      }
    }

    if (profile.phone) {
      try {
        phone = PhoneNumberVO.reconstitute(profile.phone);
      } catch {
        this.logger.warn(`Invalid phone for user ${request.userId}`);
      }
    }

    const recipient = NotificationRecipientVO.reconstitute({
      userId,
      channel,
      email,
      phone,
    });

    return {
      recipient,
      userProfile: {
        name: profile.name ?? profile.firstName,
        locale: profile.locale,
        timezone: profile.timezone,
      },
    };
  }

  async resolveMany(
    requests: readonly ResolveRecipientRequest[],
  ): Promise<readonly ResolvedRecipient[]> {
    const results = await Promise.all(
      requests.map((r) => this.resolve(r)),
    );
    return results.filter((r): r is ResolvedRecipient => r !== null);
  }
}
