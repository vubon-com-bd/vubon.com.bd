import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserPreferencesServiceInterface } from '../interfaces/user-preferences.service.interface';
import type { UserPreferencesRepository } from '../../../domain/repositories/user-preferences.repository.interface';
import { UserPreferencesEntity } from '../../../domain/entities/user-preferences.entity';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { UserOperationFailedError } from '../../errors/user.errors';
import type { UpdatePreferencesRequestDTO } from '../../dtos/requests/user/update-preferences.dto';
import type { UserPreferencesResponseDTO } from '../../dtos/responses/user-preferences-response.dto';

@Injectable()
export class UserPreferencesService
  extends BaseService<UserPreferencesEntity, string>
  implements UserPreferencesServiceInterface
{
  readonly name = 'UserPreferencesService';

  constructor(
    @Inject('UserPreferencesRepository') private readonly preferencesRepo: UserPreferencesRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async findByUserId(userId: string): Promise<UserPreferencesResponseDTO | null> {
    const entity = await this.preferencesRepo.findByUserId(UserIdVO.create(userId));
    return entity ? this.toDTO(entity) : null;
  }

  async update(
    userId: string,
    input: UpdatePreferencesRequestDTO,
  ): Promise<UserPreferencesResponseDTO> {
    const userIdVO = UserIdVO.create(userId);
    const entity = await this.preferencesRepo.findByUserId(userIdVO);
    if (!entity) {
      throw new UserOperationFailedError(`preferences not found: ${userId}`);
    }

    let updated = entity;
    if (input.promotions !== undefined) {
      updated = updated.toggleMarketing(input.promotions);
    }

    await this.preferencesRepo.save(updated);
    return this.toDTO(updated);
  }

  private toDTO(entity: UserPreferencesEntity): UserPreferencesResponseDTO {
    return {
      success: true,
      preferences: {
        userId: entity.userId.value,
        newsletter: entity.newsletter,
        promotions: entity.marketingEmails,
        orderUpdates: entity.orderUpdates,
        productRecommendations: entity.productUpdates,
        securityAlerts: entity.securityAlerts,
        channels: [],
        updatedAt: entity.updatedAt,
      },
    };
  }
}
