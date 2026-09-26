import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetPersonalizationsQuery } from './get-personalizations.query';
import type { PersonalizationRepository } from '../../../domain/repositories/personalization.repository.interface';
import type { PersonalizationResponseDTO } from '../../dtos/responses/personalization-response.dto';

@QueryHandler(GetPersonalizationsQuery)
export class GetPersonalizationsHandler
  extends BaseQueryHandler<GetPersonalizationsQuery, readonly PersonalizationResponseDTO[]>
  implements IQueryHandler<GetPersonalizationsQuery>
{
  readonly queryType = 'ai.personalization.list';
  constructor(private readonly personalizationRepo: PersonalizationRepository) { super(); }

  async execute(query: GetPersonalizationsQuery): Promise<readonly PersonalizationResponseDTO[]> {
    const entities = await this.personalizationRepo.findByUserId(query.userId);
    return entities.map((e) => ({
      id: e.id.value,
      userId: e.profile.userId.value,
      type: e.type.value,
      status: e.status.value,
      confidence: e.confidence,
      profile: {
        userId: e.profile.userId.value,
        interests: e.profile.interests,
        categories: e.profile.categories,
        brandAffinity: e.profile.brandAffinity,
        priceRangeMin: e.profile.priceRangeMin,
        priceRangeMax: e.profile.priceRangeMax,
      },
    }));
  }
}
