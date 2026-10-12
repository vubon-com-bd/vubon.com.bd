/**
 * Traffic Source Service Interface
 * @module analytics-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services';
import type { TrafficSourceEntity } from '../../../domain/entities/traffic-source.entity.js';
import type { TrafficSourceResponseData } from '../../dtos/responses/traffic-source-response.dto.js';

export interface ITrafficSourceService extends BaseServiceInterface<TrafficSourceEntity, string> {
  classify(input: {
    referrer?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    gclid?: string;
    fbclid?: string;
    ownHost?: string;
  }): TrafficSourceResponseData;
  findByChannelKey(channelKey: string): Promise<TrafficSourceEntity | null>;
  listPaid(): Promise<readonly TrafficSourceEntity[]>;
}
