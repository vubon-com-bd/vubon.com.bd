import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UtmSourceVO } from '../primitives/utm-source.vo';
import { UtmMediumVO } from '../primitives/utm-medium.vo';
import { UtmCampaignVO } from '../primitives/utm-campaign.vo';
import { ReferrerVO } from '../primitives/referrer.vo';

export interface TrafficSourceProps {
  readonly source: UtmSourceVO | null;
  readonly medium: UtmMediumVO | null;
  readonly campaign: UtmCampaignVO | null;
  readonly referrer: ReferrerVO;
}

export class TrafficSourceVO extends BaseVO<TrafficSourceProps> {
  static create(props: TrafficSourceProps): TrafficSourceVO {
    return new TrafficSourceVO(Object.freeze({ ...props }));
  }

  private constructor(value: TrafficSourceProps) {
    super(value);
  }

  get source(): UtmSourceVO | null { return this.value.source; }
  get medium(): UtmMediumVO | null { return this.value.medium; }
  get campaign(): UtmCampaignVO | null { return this.value.campaign; }
  get referrer(): ReferrerVO { return this.value.referrer; }

  get hasUtm(): boolean {
    return this.value.source !== null ||
           this.value.medium !== null ||
           this.value.campaign !== null;
  }

  get isDirect(): boolean {
    return !this.hasUtm && this.value.referrer.isDirect;
  }

  get isPaid(): boolean {
    return this.value.medium?.isPaidMedium ?? false;
  }

  get isOrganic(): boolean {
    return this.value.medium?.isOrganicMedium ?? false;
  }

  get label(): string {
    if (this.isDirect) return 'direct';
    if (this.value.source && this.value.medium) {
      return `${this.value.source.value} / ${this.value.medium.value}`;
    }
    return this.value.source?.value ?? this.value.referrer.hostname ?? 'unknown';
  }
}
