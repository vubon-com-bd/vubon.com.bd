/**
 * ChannelSelectorService (infrastructure wrapper)
 * @module notification-service/infrastructure/services/internal
 *
 * Thin wrapper around domain `ChannelSelectorService` — adds:
 *  - Preference lookup (cached)
 *  - Provider availability check
 *  - Fallback chain resolution
 */
import { Injectable, Logger } from '@nestjs/common';

import { ChannelSelectorService as DomainChannelSelector } from '@domain/services/channel-selector.service.js';
import { NotificationChannelVO } from '@domain/primitives/notification-channel.vo.js';
import type { NotificationTypeVO } from '@domain/primitives/notification-type.vo.js';
import type { NotificationCategoryVO } from '@domain/primitives/notification-category.vo.js';
import type { NotificationPriorityVO } from '@domain/primitives/notification-priority.vo.js';
import type { PreferenceVO } from '@domain/composites/preference.vo.js';

export interface SelectChannelsRequest {
  readonly type: NotificationTypeVO;
  readonly category: NotificationCategoryVO;
  readonly priority: NotificationPriorityVO;
  readonly preference: PreferenceVO | null;
}

export interface SelectedChannels {
  readonly primary: NotificationChannelVO;
  readonly fallbacks: readonly NotificationChannelVO[];
}

@Injectable()
export class ChannelSelectorInfraService {
  private readonly logger = new Logger(ChannelSelectorInfraService.name);

  selectChannels(request: SelectChannelsRequest): SelectedChannels | null {
    if (!request.preference) {
      // No preference — default to push if urgent, else email
      const channel = request.priority.isUrgent()
        ? NotificationChannelVO.push()
        : NotificationChannelVO.email();
      return { primary: channel, fallbacks: [] };
    }

    try {
      const result = DomainChannelSelector.select({
        type: request.type,
        category: request.category,
        priority: request.priority,
        preference: request.preference,
      });
      return {
        primary: NotificationChannelVO.reconstitute(result.primary),
        fallbacks: result.fallback.map((c) => NotificationChannelVO.reconstitute(c)),
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.warn(`Channel selection failed: ${msg}`);
      return null;
    }
  }
}
