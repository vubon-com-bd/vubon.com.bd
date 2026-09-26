import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { PersonalizationServiceInterface } from '../interfaces/personalization.service.interface';
import type { PersonalizationRepository } from '../../../domain/repositories/personalization.repository.interface';
import { PersonalizationEntity } from '../../../domain/entities/personalization.entity';
import { PersonalizationIdVO } from '../../../domain/value-objects/primitives/personalization-id.vo';
import type { ApplyPersonalizationRequestDTO } from '../../dtos/requests/personalization/apply-personalization.dto';

@Injectable()
export class PersonalizationService
  extends BaseService<PersonalizationEntity, PersonalizationIdVO>
  implements PersonalizationServiceInterface
{
  readonly name = 'PersonalizationService';

  constructor(private readonly personalizationRepo: PersonalizationRepository) {
    super();
  }

  async apply(
    input: ApplyPersonalizationRequestDTO,
  ): Promise<readonly { readonly itemId: string; readonly score: number }[]> {
    const entities = await this.personalizationRepo.findByUserId(input.userId);
    const entity = entities.find((e) => e.isReady());

    if (!entity) {
      return input.items.map((i) => ({ itemId: i.itemId, score: i.baseScore }));
    }

    return input.items
      .map((item) => {
        const affinity = entity.profile.affinityFor(item.itemId);
        const boosted = item.baseScore * (1 + affinity * entity.confidence);
        return { itemId: item.itemId, score: Math.min(1, boosted) };
      })
      .sort((a, b) => b.score - a.score);
  }

  async findByUser(userId: string): Promise<readonly PersonalizationEntity[]> {
    return this.personalizationRepo.findByUserId(userId);
  }
}
