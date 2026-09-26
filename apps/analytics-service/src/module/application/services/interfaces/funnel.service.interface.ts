import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { FunnelEntity } from '../../../domain/entities/funnel.entity';
import type { FunnelIdVO } from '../../../domain/value-objects/primitives/funnel-id.vo';
import type { CreateFunnelDTO, AnalyzeFunnelDTO } from '../../dtos/requests/funnel';
import type {
  FunnelResponseDTO,
  FunnelAnalysisResponseDTO,
} from '../../dtos/responses';

export interface FunnelServiceInterface
  extends BaseServiceInterface<FunnelEntity, FunnelIdVO> {
  create(input: CreateFunnelDTO): Promise<FunnelResponseDTO>;
  analyze(input: AnalyzeFunnelDTO): Promise<FunnelAnalysisResponseDTO>;
}
