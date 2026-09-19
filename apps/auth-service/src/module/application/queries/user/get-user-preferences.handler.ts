import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetUserPreferencesQuery } from './get-user-preferences.query';
import type { UserPreferencesRepository } from '../../../domain/repositories/user-preferences.repository.interface';
import type { UserPreferencesResponseDTO } from '../../dtos/responses/user-preferences-response.dto';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';

@QueryHandler(GetUserPreferencesQuery)
export class GetUserPreferencesHandler
  extends BaseQueryHandler<GetUserPreferencesQuery, UserPreferencesResponseDTO | null>
  implements IQueryHandler<GetUserPreferencesQuery>
{
  readonly queryType = 'user.get-preferences';

  constructor(private readonly preferencesRepo: UserPreferencesRepository) {
    super();
  }

  async execute(query: GetUserPreferencesQuery): Promise<UserPreferencesResponseDTO | null> {
    const entity = await this.preferencesRepo.findByUserId(UserIdVO.create(query.userId));
    if (!entity) return null;
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
