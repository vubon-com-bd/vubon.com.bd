import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserPreferencesServiceInterface } from '../interfaces/user-preferences.service.interface.js';
import type { UserPreferencesRepository } from '../../../domain/repositories/user-preferences.repository.interface.js';
import { USER_PREFERENCES_REPOSITORY } from '../../../domain/repositories/user-preferences.repository.interface.js';
import type { UserPreferencesResponseDTO } from '../../dtos/responses/user-preferences-response.dto.js';

@Injectable()
export class UserPreferencesService extends BaseService implements UserPreferencesServiceInterface {
  readonly name = 'UserPreferencesService';
  constructor(@Inject(USER_PREFERENCES_REPOSITORY) private readonly repo: UserPreferencesRepository) { super(); }
  async findForUser(userId: string): Promise<UserPreferencesResponseDTO | null> {
    const p = await this.repo.findByUserIdRaw(userId);
    if (!p) return null;
    return {
      userId: p.userId.value, emailNotifications: p.emailNotifications,
      smsNotifications: p.smsNotifications, pushNotifications: p.pushNotifications,
      whatsappNotifications: p.whatsappNotifications, orderUpdates: p.orderUpdates,
      promotions: p.promotions, newsletter: p.newsletter,
      productRecommendations: p.productRecommendations,
      priceDropAlerts: p.priceDropAlerts, backInStockAlerts: p.backInStockAlerts,
      updatedAt: p.updatedAt,
    };
  }
  async update(userId: string, patch: Partial<UserPreferencesResponseDTO>): Promise<UserPreferencesResponseDTO> {
    const existing = await this.findForUser(userId);
    return { ...(existing ?? { userId, updatedAt: new Date().toISOString() }), ...patch } as UserPreferencesResponseDTO;
  }
  async unsubscribeAll(userId: string): Promise<void> {}
}
