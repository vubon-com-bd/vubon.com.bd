/**
 * Traffic Source Service
 * @module analytics-service/domain/services
 *
 * Referrer + UTM থেকে traffic source classify করে।
 * Business Rule:
 * - UTM overrides referrer
 * - Paid: gclid/fbclid/cpc
 * - Organic: search engines without paid
 * - Social: social platforms
 * - Direct: no referrer
 */
import { TrafficSourceVO } from '../value-objects/composites/traffic-source.vo.js';
import { EventSourceVO } from '../value-objects/primitives/event-source.vo.js';
import { ReferrerVO } from '../value-objects/primitives/referrer.vo.js';
import { UtmSourceVO } from '../value-objects/primitives/utm-source.vo.js';
import { UtmMediumVO } from '../value-objects/primitives/utm-medium.vo.js';
import { UtmCampaignVO } from '../value-objects/primitives/utm-campaign.vo.js';

export interface TrafficInputs {
  readonly referrer?: string;
  readonly utmSource?: string;
  readonly utmMedium?: string;
  readonly utmCampaign?: string;
  readonly gclid?: string;
  readonly fbclid?: string;
  readonly ownHost?: string;
}

const PAID_MEDIUMS: readonly string[] = ['cpc', 'cpm', 'cpa', 'ppc', 'paid', 'display'];
const SEARCH_SOURCES: readonly string[] = ['google', 'bing', 'yahoo', 'duckduckgo'];
const SOCIAL_SOURCES: readonly string[] = ['facebook', 'instagram', 'twitter', 'linkedin', 'tiktok', 'youtube'];

export class TrafficSourceService {
  /**
   * Classify traffic source from inputs
   */
  classify(inputs: TrafficInputs): TrafficSourceVO {
    // 1. Paid click IDs (highest priority)
    if (inputs.gclid || inputs.fbclid) {
      const source = inputs.gclid ? 'google' : 'facebook';
      return this.buildPaid(source, inputs);
    }

    // 2. UTM medium
    if (inputs.utmMedium) {
      const medium = inputs.utmMedium.toLowerCase();
      if (PAID_MEDIUMS.includes(medium)) {
        return this.buildPaid(inputs.utmSource ?? 'unknown', inputs);
      }
      if (medium === 'organic') {
        return this.buildOrganic(inputs);
      }
      if (medium === 'email') {
        return this.buildEmail(inputs);
      }
      if (medium === 'social') {
        return this.buildSocial(inputs);
      }
      if (medium === 'referral') {
        return this.buildReferral(inputs);
      }
    }

    // 3. Referrer-based
    if (inputs.referrer) {
      const referrer = ReferrerVO.create(inputs.referrer);
      if (referrer.isFromSearch()) {
        return this.buildOrganic(inputs);
      }
      if (referrer.isFromSocial()) {
        return this.buildSocial(inputs);
      }
      if (inputs.ownHost && referrer.isInternal(inputs.ownHost)) {
        return TrafficSourceVO.create({
          source: EventSourceVO.create('internal'),
          referrer,
        });
      }
      // External
      return TrafficSourceVO.create({
        source: EventSourceVO.create('referral'),
        referrer,
        utmSource: inputs.utmSource ? UtmSourceVO.create(inputs.utmSource) : undefined,
      });
    }

    // 4. Direct
    return TrafficSourceVO.direct();
  }

  /**
   * Determine if paid traffic
   */
  isPaid(inputs: TrafficInputs): boolean {
    if (inputs.gclid || inputs.fbclid) return true;
    if (inputs.utmMedium && PAID_MEDIUMS.includes(inputs.utmMedium.toLowerCase())) return true;
    return false;
  }

  // ─── Private ────────────────────────────────

  private buildPaid(defaultSource: string, inputs: TrafficInputs): TrafficSourceVO {
    const utmSource = inputs.utmSource ?? defaultSource;
    return TrafficSourceVO.create({
      source: EventSourceVO.create('paid'),
      utmSource: UtmSourceVO.create(utmSource),
      utmMedium: UtmMediumVO.create(inputs.utmMedium ?? 'cpc'),
      utmCampaign: inputs.utmCampaign
        ? UtmCampaignVO.create(inputs.utmCampaign)
        : UtmCampaignVO.create('unknown'),
    });
  }

  private buildOrganic(inputs: TrafficInputs): TrafficSourceVO {
    return TrafficSourceVO.create({
      source: EventSourceVO.create('organic'),
      utmSource: inputs.utmSource ? UtmSourceVO.create(inputs.utmSource) : undefined,
      referrer: inputs.referrer ? ReferrerVO.create(inputs.referrer) : undefined,
    });
  }

  private buildEmail(inputs: TrafficInputs): TrafficSourceVO {
    return TrafficSourceVO.create({
      source: EventSourceVO.create('email'),
      utmSource: inputs.utmSource ? UtmSourceVO.create(inputs.utmSource) : undefined,
      utmMedium: UtmMediumVO.create('email'),
      utmCampaign: inputs.utmCampaign ? UtmCampaignVO.create(inputs.utmCampaign) : undefined,
    });
  }

  private buildSocial(inputs: TrafficInputs): TrafficSourceVO {
    return TrafficSourceVO.create({
      source: EventSourceVO.create('social'),
      utmSource: inputs.utmSource ? UtmSourceVO.create(inputs.utmSource) : undefined,
      referrer: inputs.referrer ? ReferrerVO.create(inputs.referrer) : undefined,
    });
  }

  private buildReferral(inputs: TrafficInputs): TrafficSourceVO {
    return TrafficSourceVO.create({
      source: EventSourceVO.create('referral'),
      utmSource: inputs.utmSource ? UtmSourceVO.create(inputs.utmSource) : undefined,
      referrer: inputs.referrer ? ReferrerVO.create(inputs.referrer) : undefined,
    });
  }
}
