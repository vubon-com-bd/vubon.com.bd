/**
 * Traffic Source Value Object (Composite)
 * @module analytics-service/domain/value-objects/composites
 *
 * Complete traffic attribution snapshot।
 * Business Rule:
 * - Source + Medium + Campaign + Referrer composite
 * - At least source থাকতে হবে
 * - Paid source-এ campaign লাগবে
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base';
import { EventSourceVO } from '../primitives/event-source.vo.js';
import { UtmSourceVO } from '../primitives/utm-source.vo.js';
import { UtmMediumVO } from '../primitives/utm-medium.vo.js';
import { UtmCampaignVO } from '../primitives/utm-campaign.vo.js';
import { ReferrerVO } from '../primitives/referrer.vo.js';

export interface TrafficSourceVOProps {
  readonly source: EventSourceVO;
  readonly utmSource?: UtmSourceVO;
  readonly utmMedium?: UtmMediumVO;
  readonly utmCampaign?: UtmCampaignVO;
  readonly referrer?: ReferrerVO;
}

export class TrafficSourceVO extends BaseVO<TrafficSourceVOProps> {
  private constructor(props: TrafficSourceVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: TrafficSourceVOProps): TrafficSourceVO {
    if (!props.source) {
      throw new Error('TrafficSourceVO requires source');
    }

    // Paid source → campaign + medium লাগবে
    if (props.source.isPaid()) {
      if (!props.utmCampaign) {
        throw new Error('Paid traffic source requires utmCampaign');
      }
      if (!props.utmMedium) {
        throw new Error('Paid traffic source requires utmMedium');
      }
    }

    // UTM source থাকলে referrer থাকা উচিত নয় (mixed signal)
    if (props.utmSource && props.referrer && !props.referrer.isDirect()) {
      // This is OK actually — UTM overrides referrer
    }

    return new TrafficSourceVO(props);
  }

  static direct(): TrafficSourceVO {
    return new TrafficSourceVO({
      source: EventSourceVO.create('direct'),
      referrer: ReferrerVO.direct(),
    });
  }

  get source(): EventSourceVO {
    return this.value.source;
  }

  get utmSource(): UtmSourceVO | undefined {
    return this.value.utmSource;
  }

  get utmMedium(): UtmMediumVO | undefined {
    return this.value.utmMedium;
  }

  get utmCampaign(): UtmCampaignVO | undefined {
    return this.value.utmCampaign;
  }

  get referrer(): ReferrerVO | undefined {
    return this.value.referrer;
  }

  hasUtm(): boolean {
    return this.utmSource !== undefined || this.utmMedium !== undefined;
  }

  hasCampaign(): boolean {
    return this.utmCampaign !== undefined;
  }

  /** Display channel (facebook, google, newsletter) */
  channel(): string {
    if (this.utmSource) return this.utmSource.value;
    if (this.referrer && !this.referrer.isDirect()) {
      return this.referrer.host() ?? 'direct';
    }
    return 'direct';
  }

  /** Attribution-eligible কিনা */
  isAttributable(): boolean {
    return this.source.isAttributable();
  }

  /** Campaign attribution ID */
  campaignKey(): string | null {
    if (!this.utmCampaign || !this.utmSource) return null;
    return `${this.utmSource.value}:${this.utmCampaign.value}`;
  }
}
