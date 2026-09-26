import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetProfileQuery } from './get-profile.query';
import type { PersonalizationProfileRepository } from '../../../domain/repositories/personalization-profile.repository.interface';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import type { PersonalizationProfileResponseDTO } from '../../dtos/responses/personalization-response.dto';

@QueryHandler(GetProfileQuery)
export class GetProfileHandler
  extends BaseQueryHandler<GetProfileQuery, PersonalizationProfileResponseDTO | null>
  implements IQueryHandler<GetProfileQuery>
{
  readonly queryType = 'ai.personalization.get-profile';
  constructor(private readonly profileRepo: PersonalizationProfileRepository) { super(); }

  async execute(query: GetProfileQuery): Promise<PersonalizationProfileResponseDTO | null> {
    const entity = await this.profileRepo.findByUserId(UserIdVO.create(query.userId));
    if (!entity) return null;
    return {
      userId: entity.profile.userId.value,
      interests: entity.profile.interests,
      categories: entity.profile.categories,
      brandAffinity: entity.profile.brandAffinity,
      priceRangeMin: entity.profile.priceRangeMin,
      priceRangeMax: entity.profile.priceRangeMax,
    };
  }
}
