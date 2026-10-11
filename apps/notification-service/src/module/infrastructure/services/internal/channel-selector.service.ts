/**
 * ChannelSelectorService — decides which channels to use per type/priority
 * @module notification-service/infrastructure/services/internal
 */
import { Injectable, Logger } from '@nestjs/common';

export const CHANNEL_SELECTOR_SERVICE = Symbol('CHANNEL_SELECTOR_SERVICE');

export interface ChannelSelectionInput {
  readonly type: string;
  readonly priority: string;
  readonly availableChannels: readonly string[];
  readonly preferredChannels?: readonly string[];
}

const PRIORITY_ORDER: Record<string, number> = {
  critical: 0,
  high: 1,
  normal: 2,
  low: 3,
  silent: 4,
};

@Injectable()
export class ChannelSelectorService {
  private readonly logger = new Logger(ChannelSelectorService.name);

  select(input: ChannelSelectionInput): readonly string[] {
    const { type, priority, availableChannels, preferredChannels } = input;
    if (availableChannels.length === 0) return [];

    // Explicit preference wins
    if (preferredChannels && preferredChannels.length > 0) {
      return availableChannels.filter((c) => preferredChannels.includes(c));
    }

    // Security/alert: all channels
    if (this.isSecurityLike(type) || priority === 'critical') {
      return this.sortByPriority(availableChannels, priority);
    }

    // Marketing/promo: email + push + in_app
    if (this.isMarketing(type)) {
      return this.filterTo(availableChannels, ['email', 'push', 'in_app']);
    }

    // Reminder: push + in_app
    if (type === 'reminder') {
      return this.filterTo(availableChannels, ['push', 'in_app']);
    }

    // Default: order by priority
    return this.sortByPriority(availableChannels, priority);
  }

  private isSecurityLike(type: string): boolean {
    return ['security', 'alert', 'verification'].includes(type);
  }

  private isMarketing(type: string): boolean {
    return ['marketing', 'promotional', 'announcement'].includes(type);
  }

  private filterTo(available: readonly string[], wanted: readonly string[]): readonly string[] {
    return wanted.filter((w) => available.includes(w));
  }

  private sortByPriority(channels: readonly string[], priority: string): readonly string[] {
    // Higher priority → prefer instant channels first
    const instantWeight = (c: string): number => {
      if (c === 'push' || c === 'in_app') return 0;
      if (c === 'email') return 1;
      if (c === 'sms') return 2;
      if (c === 'whatsapp') return 3;
      if (c === 'webhook') return 4;
      return 5;
    };
    const weight = PRIORITY_ORDER[priority] ?? 2;
    return [...channels].sort((a, b) => {
      const aw = instantWeight(a) + weight * 0.1;
      const bw = instantWeight(b) + weight * 0.1;
      return aw - bw;
    });
  }
}
