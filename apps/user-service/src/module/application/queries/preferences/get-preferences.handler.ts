/**
 * GetPreferencesHandler
 */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetPreferencesQuery } from './get-preferences.query.js';
import { USER_PREFERENCES_REPOSITORY } from '@domain/repositories/user-preferences.repository.interface';
import type { UserPreferencesRepository } from '@domain/repositories/user-preferences.repository.interface';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import type { PreferencesResponseDTO } from '../../dtos/responses/preferences-response.dto.js';
import { PreferenceNotFoundApplicationError } from '../../errors/preference.errors.js';

@QueryHandler(GetPreferencesQuery)
export class GetPreferencesHandler
  implements IQueryHandler<GetPreferencesQuery, PreferencesResponseDTO>
{
  constructor(
    @Inject(USER_PREFERENCES_REPOSITORY)
    private readonly prefsRepo: UserPreferencesRepository
  ) {}

  async execute(query: GetPreferencesQuery): Promise<PreferencesResponseDTO> {
    const prefs = await this.prefsRepo.findByUserId(UserIdVO.create(query.userId));
    if (!prefs) throw new PreferenceNotFoundApplicationError(query.userId);

    return {
      userId: query.userId,
      newsletter: prefs.isEnabled('newsletter'),
      promotions: prefs.isEnabled('promotions'),
      orderUpdates: prefs.isEnabled('order_updates'),
      productRecommendations: prefs.isEnabled('product_recommendations'),
      securityAlerts: prefs.isEnabled('security_alerts'),
      channels: [],
      updatedAt: prefs.updatedAt,
    };
  }
}
