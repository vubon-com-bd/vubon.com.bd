/**
 * PreferenceCheckerService — cached preference lookup + should-send decision
 * @module notification-service/infrastructure/services/internal
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  PREFERENCE_REPOSITORY,
  type PreferenceRepository,
} from '../../../domain/repositories/preference.repository.interface.js';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo.js';
import { NotificationTypeVO } from '../../../domain/value-objects/primitives/notification-type.vo.js';
import { NotificationCategoryVO } from '../../../domain/value-objects/primitives/notification-category.vo.js';
import { NotificationChannelVO } from '../../../domain/value-objects/primitives/notification-channel.vo.js';
import { NotificationPriorityVO } from '../../../domain/value-objects/primitives/notification-priority.vo.js';
import { NotificationPreferenceCheckerService } from '../../../domain/services/notification-preference-checker.service.js';
import { PreferenceCacheRepository } from '../../persistence/cache/repositories/preference.cache.repository.js';
import { PreferencePrismaMapper } from '../../persistence/prisma/mappers/preference.prisma.mapper.js';
import type { PreferenceEntity } from '../../../domain/entities/preference.entity.js';

export const PREFERENCE_CHECKER_SERVICE = Symbol('PREFERENCE_CHECKER_SERVICE');

@Injectable()
export class PreferenceCheckerService {
  private readonly logger = new Logger(PreferenceCheckerService.name);

  constructor(
    @Inject(PREFERENCE_REPOSITORY) private readonly preferenceRepo: PreferenceRepository,
    private readonly cache: PreferenceCacheRepository,
  ) {}

  /** Load preference with cache-aside. */
  async load(userId: string): Promise<PreferenceEntity | null> {
    const cached = await this.cache.get(userId);
    if (cached) {
      try {
        return PreferencePrismaMapper.toDomain({
          id: cached.id,
          userId: cached.userId,
          channelPreferences: cached.channelPreferences,
          categoryPreferences: cached.categoryPreferences,
          quietHoursEnabled: cached.quietHoursEnabled,
          quietHoursStart: cached.quietHoursStart ?? null,
          quietHoursEnd: cached.quietHoursEnd ?? null,
          timezone: cached.timezone,
          locale: cached.locale ?? null,
          version: 0,
          createdAt: new Date(cached.createdAt),
          updatedAt: new Date(cached.updatedAt),
          deletedAt: null,
        });
      } catch {
        await this.cache.invalidate(userId);
      }
    }

    const entity = await this.preferenceRepo.findByUserId(UserIdVO.create(userId));
    if (entity) {
      await this.cache.set(userId, {
        id: entity.id,
        userId: entity.userId,
        channelPreferences: entity.channelPreferences,
        categoryPreferences: entity.categoryPreferences,
        quietHoursEnabled: entity.quietHoursEnabled,
        quietHoursStart: entity.quietHoursStart,
        quietHoursEnd: entity.quietHoursEnd,
        timezone: entity.timezone,
        locale: entity.locale,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      });
    }
    return entity;
  }

  /** Full should-send check. */
  async shouldSend(input: {
    userId: string;
    type: string;
    category: string;
    channel: string;
    priority: string;
    currentHour?: number;
  }): Promise<{ shouldSend: boolean; reason?: string; deferUntil?: string }> {
    const preference = await this.load(input.userId);
    if (!preference) return { shouldSend: true, reason: 'no_preference_record' };

    const domainResult = NotificationPreferenceCheckerService.check({
      preference,
      type: NotificationTypeVO.reconstitute(input.type),
      category: NotificationCategoryVO.reconstitute(input.category),
      channel: NotificationChannelVO.reconstitute(input.channel),
      priority: NotificationPriorityVO.reconstitute(input.priority),
      currentHour: input.currentHour ?? new Date().getHours(),
    });

    return {
      shouldSend: domainResult.shouldSend,
      reason: domainResult.reason,
      deferUntil: domainResult.deferUntilQuietHoursEnd
        ? this.computeNextAllowed(preference)
        : undefined,
    };
  }

  private computeNextAllowed(preference: PreferenceEntity): string {
    const endHour = preference.quietHoursEnd ?? 8;
    const next = new Date();
    next.setHours(endHour, 0, 0, 0);
    if (next.getTime() <= Date.now()) next.setDate(next.getDate() + 1);
    return next.toISOString();
  }
}
