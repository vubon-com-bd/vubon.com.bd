/**
 * PreferenceControllerMapper
 * @module notification-service/interfaces/mappers
 */
import type {
  UpdatePreferenceHttpDTO,
  ToggleChannelHttpDTO,
  ToggleCategoryHttpDTO,
  UpdateQuietHoursHttpDTO,
  OptOutHttpDTO,
  OptInHttpDTO,
} from '../dtos/requests/preference/preference.http-dto.js';
import type {
  UpdatePreferenceRequestDTO,
  ToggleChannelRequestDTO,
  ToggleCategoryRequestDTO,
  UpdateQuietHoursRequestDTO,
  OptOutRequestDTO,
  OptInRequestDTO,
} from '../../application/dtos/requests/preference/preference.dto.js';

export class PreferenceControllerMapper {
  static toUpdateAppDto(userId: string, dto: UpdatePreferenceHttpDTO): UpdatePreferenceRequestDTO {
    return {
      userId,
      channelPreferences: dto.channelPreferences,
      categoryPreferences: dto.categoryPreferences,
      frequency: dto.frequency as never,
      timezone: dto.timezone,
      locale: dto.locale,
    };
  }

  static toToggleChannelAppDto(userId: string, dto: ToggleChannelHttpDTO): ToggleChannelRequestDTO {
    return { userId, channel: dto.channel, enabled: dto.enabled };
  }

  static toToggleCategoryAppDto(userId: string, dto: ToggleCategoryHttpDTO): ToggleCategoryRequestDTO {
    return { userId, category: dto.category, enabled: dto.enabled };
  }

  static toQuietHoursAppDto(userId: string, dto: UpdateQuietHoursHttpDTO): UpdateQuietHoursRequestDTO {
    return {
      userId,
      enabled: dto.enabled,
      startHour: dto.startHour,
      endHour: dto.endHour,
      timezone: dto.timezone,
    };
  }

  static toOptOutAppDto(userId: string, dto: OptOutHttpDTO): OptOutRequestDTO {
    return { userId, scope: dto.scope, reason: dto.reason };
  }

  static toOptInAppDto(userId: string, dto: OptInHttpDTO): OptInRequestDTO {
    return { userId, scope: dto.scope };
  }
}
