import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { PersonalizationProfileEntity } from '../../../domain/entities/personalization-profile.entity';
import type { PersonalizationIdVO } from '../../../domain/value-objects/primitives/personalization-id.vo';
import type { BuildProfileRequestDTO } from '../../dtos/requests/personalization/build-profile.dto';
import type { UpdateProfileRequestDTO } from '../../dtos/requests/personalization/update-profile.dto';

export interface PersonalizationProfileServiceInterface
  extends BaseServiceInterface<PersonalizationProfileEntity, PersonalizationIdVO> {
  build(input: BuildProfileRequestDTO): Promise<PersonalizationProfileEntity>;
  update(input: UpdateProfileRequestDTO): Promise<PersonalizationProfileEntity>;
  findByUser(userId: string): Promise<PersonalizationProfileEntity | null>;
}
