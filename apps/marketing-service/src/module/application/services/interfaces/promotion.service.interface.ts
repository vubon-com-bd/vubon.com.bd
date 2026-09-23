import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { PromotionEntity } from '../../../domain/entities/promotion.entity';
import type { CreatePromotionRequestDTO } from '../../dtos/requests/promotion/create-promotion.dto';
import type { ApplyPromotionRequestDTO } from '../../dtos/requests/promotion/apply-promotion.dto';
import type { PromotionResponseDTO } from '../../dtos/responses/promotion-response.dto';

export interface PromotionServiceInterface
  extends BaseServiceInterface<PromotionEntity, string> {
  create(input: CreatePromotionRequestDTO): Promise<PromotionResponseDTO>;
  apply(input: ApplyPromotionRequestDTO): Promise<number>;
  validate(input: ApplyPromotionRequestDTO): Promise<boolean>;
  findByCode(code: string): Promise<PromotionResponseDTO | null>;
}
