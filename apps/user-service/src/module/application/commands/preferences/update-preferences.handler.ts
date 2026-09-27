/**
 * UpdatePreferencesHandler
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdatePreferencesCommand } from './update-preferences.command.js';
import { USER_PREFERENCES_REPOSITORY } from '@domain/repositories/user-preferences.repository.interface';
import type { UserPreferencesRepository } from '@domain/repositories/user-preferences.repository.interface';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { PreferenceKeyVO } from '@domain/value-objects/primitives/preference-key.vo';
import { PreferenceValueVO } from '@domain/value-objects/primitives/preference-value.vo';
import type { PreferencesResponseDTO } from '../../dtos/responses/preferences-response.dto.js';
import {
  PreferenceNotFoundApplicationError,
  PreferenceUpdateFailedError,
} from '../../errors/preference.errors.js';

@CommandHandler(UpdatePreferencesCommand)
export class UpdatePreferencesHandler
  implements ICommandHandler<UpdatePreferencesCommand, PreferencesResponseDTO>
{
  constructor(
    @Inject(USER_PREFERENCES_REPOSITORY)
    private readonly prefsRepo: UserPreferencesRepository
  ) {}

  async execute(command: UpdatePreferencesCommand): Promise<PreferencesResponseDTO> {
    const { userId, ...fields } = command.payload;
    const userIdVO = UserIdVO.create(userId);

    const prefs = await this.prefsRepo.findByUserId(userIdVO);
    if (!prefs) throw new PreferenceNotFoundApplicationError(userId);

    try {
      const map: Record<string, string | undefined> = {
        'newsletter': fields.newsletter !== undefined ? String(fields.newsletter) : undefined,
        'promotions': fields.promotions !== undefined ? String(fields.promotions) : undefined,
        'order_updates': fields.orderUpdates !== undefined ? String(fields.orderUpdates) : undefined,
        'product_recommendations': fields.productRecommendations !== undefined ? String(fields.productRecommendations) : undefined,
        'security_alerts': fields.securityAlerts !== undefined ? String(fields.securityAlerts) : undefined,
      };

      for (const [key, value] of Object.entries(map)) {
        if (value === undefined) continue;
        prefs.set(PreferenceKeyVO.create(key), PreferenceValueVO.create(value));
      }

      await this.prefsRepo.save(prefs);

      return {
        userId,
        newsletter: prefs.isEnabled('newsletter'),
        promotions: prefs.isEnabled('promotions'),
        orderUpdates: prefs.isEnabled('order_updates'),
        productRecommendations: prefs.isEnabled('product_recommendations'),
        securityAlerts: prefs.isEnabled('security_alerts'),
        channels: [],
        updatedAt: prefs.updatedAt,
      };
    } catch (err) {
      const reason = err instanceof Error ? err.message : 'unknown error';
      throw new PreferenceUpdateFailedError(userId, reason);
    }
  }
}
