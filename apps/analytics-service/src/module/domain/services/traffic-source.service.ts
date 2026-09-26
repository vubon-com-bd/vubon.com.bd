import { TrafficSourceVO } from '../value-objects/composites/traffic-source.vo';
import { UtmSourceVO } from '../value-objects/primitives/utm-source.vo';
import { UtmMediumVO } from '../value-objects/primitives/utm-medium.vo';
import { UtmCampaignVO } from '../value-objects/primitives/utm-campaign.vo';
import { ReferrerVO } from '../value-objects/primitives/referrer.vo';
import { ANALYTICS_SOURCE } from '@vubon/shared-constants/platform/analytics';

export interface TrafficInput {
  readonly utmSource?: string;
  readonly utmMedium?: string;
  readonly utmCampaign?: string;
  readonly referrer?: string;
}

export class TrafficSourceService {
  classify(input: TrafficInput): TrafficSourceVO {
    const source = input.utmSource ? UtmSourceVO.create(input.utmSource) : null;
    const medium = input.utmMedium ? UtmMediumVO.create(input.utmMedium) : null;
    const campaign = input.utmCampaign
      ? UtmCampaignVO.create(input.utmCampaign)
      : null;
    const referrer = input.referrer
      ? ReferrerVO.create(input.referrer)
      : ReferrerVO.direct();

    return TrafficSourceVO.create({ source, medium, campaign, referrer });
  }

  isPaid(traffic: TrafficSourceVO): boolean {
    return traffic.isPaid;
  }

  isOrganic(traffic: TrafficSourceVO): boolean {
    return traffic.isOrganic;
  }

  isDirect(traffic: TrafficSourceVO): boolean {
    return traffic.isDirect;
  }
}
