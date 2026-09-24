import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { UtmSourceVO } from '../value-objects/primitives/utm-source.vo';
import { UtmMediumVO } from '../value-objects/primitives/utm-medium.vo';
import { UtmCampaignVO } from '../value-objects/primitives/utm-campaign.vo';
import { ReferrerVO } from '../value-objects/primitives/referrer.vo';

export interface TrafficSourceEntityProps {
  readonly source: UtmSourceVO | null;
  readonly medium: UtmMediumVO | null;
  readonly campaign: UtmCampaignVO | null;
  readonly referrer: ReferrerVO;
  readonly sessions: number;
}

export class TrafficSourceEntity extends BaseEntity<string> {
  private readonly _source: UtmSourceVO | null;
  private readonly _medium: UtmMediumVO | null;
  private readonly _campaign: UtmCampaignVO | null;
  private readonly _referrer: ReferrerVO;
  private readonly _sessions: number;

  private constructor(
    id: string,
    props: TrafficSourceEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._source = props.source;
    this._medium = props.medium;
    this._campaign = props.campaign;
    this._referrer = props.referrer;
    this._sessions = props.sessions;
  }

  static create(props: TrafficSourceEntityProps): TrafficSourceEntity {
    if (props.sessions < 0) {
      throw new Error('Sessions cannot be negative');
    }
    const now = new Date().toISOString();
    return new TrafficSourceEntity(crypto.randomUUID(), props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: TrafficSourceEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): TrafficSourceEntity {
    return new TrafficSourceEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get source(): UtmSourceVO | null { return this._source; }
  get medium(): UtmMediumVO | null { return this._medium; }
  get campaign(): UtmCampaignVO | null { return this._campaign; }
  get referrer(): ReferrerVO { return this._referrer; }
  get sessions(): number { return this._sessions; }

  get isDirect(): boolean {
    return this._source === null && this._referrer.isDirect;
  }

  get isPaid(): boolean {
    return this._medium?.isPaidMedium ?? false;
  }
}
