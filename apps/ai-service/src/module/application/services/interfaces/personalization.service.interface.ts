import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { PersonalizationEntity } from '../../../domain/entities/personalization.entity';
import type { PersonalizationIdVO } from '../../../domain/value-objects/primitives/personalization-id.vo';
import type { ApplyPersonalizationRequestDTO } from '../../dtos/requests/personalization/apply-personalization.dto';

export interface PersonalizationServiceInterface
  extends BaseServiceInterface<PersonalizationEntity, PersonalizationIdVO> {
  apply(input: ApplyPersonalizationRequestDTO): Promise<readonly { readonly itemId: string; readonly score: number }[]>;
  findByUser(userId: string): Promise<readonly PersonalizationEntity[]>;
}
