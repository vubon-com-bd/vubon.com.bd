import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { PersonalizationProfileServiceInterface } from '../interfaces/personalization-profile.service.interface';
import type { PersonalizationProfileRepository } from '../../../domain/repositories/personalization-profile.repository.interface';
import { PersonalizationProfileEntity } from '../../../domain/entities/personalization-profile.entity';
import { PersonalizationIdVO } from '../../../domain/value-objects/primitives/personalization-id.vo';
import { UserProfileBuilderService } from '../../../domain/services/user-profile-builder.service';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import type { BuildProfileRequestDTO } from '../../dtos/requests/personalization/build-profile.dto';
import type { UpdateProfileRequestDTO } from '../../dtos/requests/personalization/update-profile.dto';

@Injectable()
export class PersonalizationProfileService
  extends BaseService<PersonalizationProfileEntity, PersonalizationIdVO>
  implements PersonalizationProfileServiceInterface
{
  readonly name = 'PersonalizationProfileService';

  constructor(
    private readonly profileRepo: PersonalizationProfileRepository,
    private readonly builder: UserProfileBuilderService,
  ) {
    super();
  }

  async build(input: BuildProfileRequestDTO): Promise<PersonalizationProfileEntity> {
    const userId = UserIdVO.create(input.userId);

    // Inject userId into each interaction record
    const interactions = input.interactions.map((i) => ({
      userId: input.userId,
      action: i.action,
      categories: i.categories ?? [],
      brands: i.brands ?? [],
      price: i.price ?? null,
    }));

    const built = this.builder.build(userId, interactions);
    const profileVO = this.builder.toProfile(built);
    const entity = PersonalizationProfileEntity.create({ profile: profileVO });
    await this.profileRepo.save(entity);
    return entity;
  }

  async update(input: UpdateProfileRequestDTO): Promise<PersonalizationProfileEntity> {
    const userId = UserIdVO.create(input.userId);
    const existing = await this.profileRepo.findByUserId(userId);
    if (!existing) {
      throw new Error(`Personalization profile not found for user: ${input.userId}`);
    }
    const updated = existing.applyUpdate({
      interests: input.interests,
      categories: input.categories,
      brandAffinity: input.brandAffinity,
      priceRangeMin: input.priceRangeMin,
      priceRangeMax: input.priceRangeMax,
    });
    await this.profileRepo.save(updated);
    return updated;
  }

  async findByUser(userId: string): Promise<PersonalizationProfileEntity | null> {
    return this.profileRepo.findByUserId(UserIdVO.create(userId));
  }
}
