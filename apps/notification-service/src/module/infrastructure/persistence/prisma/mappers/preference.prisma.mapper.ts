/**
 * PreferencePrismaMapper — Prisma NotificationPreference ↔ PreferenceEntity
 * @module notification-service/infrastructure/persistence/prisma/mappers
 *
 * Prisma fields:
 *  - channelPreferences (Json) → PreferenceVO.options (channel-level enabled)
 *  - categoryPreferences (Json) → PreferenceVO.options (category-level)
 *  - quietHours* + timezone + locale → direct mapping
 */
import type { PrismaNotificationPreference } from '@infrastructure/persistence/prisma/prisma.client.js';
import { toIso, toIsoRequired, jsonRecord } from '@infrastructure/persistence/prisma/prisma-mapper.helpers.js';

import { PreferenceEntity } from '@domain/entities/preference.entity.js';
import { PreferenceVO } from '@domain/composites/preference.vo.js';
import { PreferenceIdVO } from '@domain/primitives/preference-id.vo.js';
import { PreferenceTypeVO } from '@domain/primitives/preference-type.vo.js';
import { PreferenceOptionVO } from '@domain/primitives/preference-option.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';

export class PreferencePrismaMapper {
  // ═══════════════ Prisma → Domain ═══════════════
  static toDomain(raw: PrismaNotificationPreference): PreferenceEntity {
    const options = this.buildOptions(raw);

    const vo = PreferenceVO.reconstitute({
      id: PreferenceIdVO.reconstitute(raw.id),
      userId: UserIdVO.reconstitute(raw.userId),
      type: PreferenceTypeVO.reconstitute('channel_specific'),
      options,
      quietHoursEnabled: raw.quietHoursEnabled,
      quietHoursStart: raw.quietHoursStart ?? undefined,
      quietHoursEnd: raw.quietHoursEnd ?? undefined,
      timezone: raw.timezone,
      locale: raw.locale,
      locked: false,
    });

    return PreferenceEntity.reconstitute({
      id: raw.id,
      createdAt: toIsoRequired(raw.createdAt),
      updatedAt: toIsoRequired(raw.updatedAt),
      deletedAt: toIso(raw.deletedAt) ?? null,
      version: raw.version,
      props: { vo },
    });
  }

  // ═══════════════ Domain → Prisma ═══════════════
  static toPersistence(entity: PreferenceEntity): Record<string, unknown> {
    const vo = entity.vo;
    const channels: Record<string, boolean> = {};
    const categories: Record<string, boolean> = {};

    for (const opt of vo.options) {
      if (opt.category) {
        categories[`${opt.channel}:${opt.category}`] = opt.enabled;
      } else {
        channels[opt.channel] = opt.enabled;
      }
    }

    return {
      id: entity.id,
      userId: vo.userId.value,
      channelPreferences: channels,
      categoryPreferences: categories,
      quietHoursEnabled: vo.quietHoursEnabled,
      quietHoursStart: vo.quietHoursStart ?? null,
      quietHoursEnd: vo.quietHoursEnd ?? null,
      timezone: vo.timezone,
      locale: vo.locale,
      version: entity.version,
      updatedAt: new Date(entity.updatedAt),
    };
  }

  // ═══════════════ Helpers ═══════════════
  private static buildOptions(raw: PrismaNotificationPreference): readonly PreferenceOptionVO[] {
    const options: PreferenceOptionVO[] = [];

    // Channel-level
    const channels = jsonRecord(raw.channelPreferences);
    for (const [channel, enabled] of Object.entries(channels)) {
      if (typeof enabled === 'boolean') {
        options.push(
          PreferenceOptionVO.reconstitute({
            channel: channel as never,
            enabled,
          }),
        );
      }
    }

    // Category-level (key format: "channel:category")
    const categories = jsonRecord(raw.categoryPreferences);
    for (const [key, enabled] of Object.entries(categories)) {
      if (typeof enabled !== 'boolean') continue;
      const [channel, category] = key.split(':');
      if (!channel || !category) continue;
      options.push(
        PreferenceOptionVO.reconstitute({
          channel: channel as never,
          category,
          enabled,
        }),
      );
    }

    return Object.freeze(options);
  }
}
