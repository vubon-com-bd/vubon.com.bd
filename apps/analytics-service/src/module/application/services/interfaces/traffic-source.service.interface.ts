import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { TrafficSourceEntity } from '../../../domain/entities/traffic-source.entity';
import type { TrafficSourceResponseDTO } from '../../dtos/responses';

export interface TrafficSourceServiceInterface
  extends BaseServiceInterface<TrafficSourceEntity, string> {
  classify(input: {
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    referrer?: string;
  }): Promise<TrafficSourceResponseDTO>;
  topSources(limit: number): Promise<readonly TrafficSourceResponseDTO[]>;
}
