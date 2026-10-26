/**
 * PreferenceMapper — Entity → Response DTO
 * @module notification-service/application/mappers
 */
import type { PreferenceEntity } from '@domain/entities/preference.entity.js';
import type { PreferenceMatrixVO } from '@domain/composites/preference-matrix.vo.js';
import type {
  PreferenceResponseDTO,
  PreferenceMatrixResponseDTO,
  PreferenceOptionResponseDTO,
} from '@application/dtos/responses/preference-response.dto.js';

export class PreferenceMapper {
  static toResponse(entity: PreferenceEntity): PreferenceResponseDTO {
    const vo = entity.vo;
    const options: PreferenceOptionResponseDTO[] = vo.options.map((o) => ({
      channel: o.channel,
      category: o.category,
      enabled: o.enabled,
    }));

    return {
      userId: vo.userId.value,
      type: vo.type.value as never,
      options,
      quietHoursEnabled: vo.quietHoursEnabled,
      quietHoursStart: vo.quietHoursStart,
      quietHoursEnd: vo.quietHoursEnd,
      timezone: vo.timezone,
      locale: vo.locale,
      locked: vo.locked,
      updatedAt: entity.updatedAt,
    };
  }

  static toMatrixResponse(entity: PreferenceEntity): PreferenceMatrixResponseDTO {
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
      userId: vo.userId.value,
      channels,
      categories,
      quietHours: vo.quietHoursEnabled
        ? { start: vo.quietHoursStart, end: vo.quietHoursEnd }
        : null,
      timezone: vo.timezone,
      locale: vo.locale,
    };
  }

  static matrixVOToResponse(vo: PreferenceMatrixVO): PreferenceMatrixResponseDTO {
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
      userId: vo.userId.value,
      channels,
      categories,
      quietHours: vo.quietHoursEnabled
        ? { start: vo.quietHoursStart, end: vo.quietHoursEnd }
        : null,
      timezone: vo.timezone,
      locale: vo.locale,
    };
  }
}
