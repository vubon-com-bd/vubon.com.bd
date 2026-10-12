/**
 * Traffic Source Entity
 * @module analytics-service/domain/entities
 *
 * Traffic source catalog — unique source/medium/campaign combos.
 * Business Rule:
 * - Unique composite key (source, medium, campaign)
 * - Used for attribution
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base';
import { TrafficSourceVO } from '../value-objects/composites/traffic-source.vo.js';

export interface TrafficSourceEntityProps {
  readonly trafficSource: TrafficSourceVO;
  readonly channelKey: string;
  occurrenceCount: number;
  lastSeenAt: string;
}

export class TrafficSourceEntity extends BaseEntity<string> {
  private props: TrafficSourceEntityProps;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: TrafficSourceEntityProps
  ) {
    super(id, createdAt, updatedAt, null);
    this.props = props;
  }

  static create(params: {
    id: string;
    trafficSource: TrafficSourceVO;
    now: string;
  }): TrafficSourceEntity {
    if (!params.trafficSource) {
      throw new Error('TrafficSourceEntity requires trafficSource');
    }

    return new TrafficSourceEntity(
      params.id,
      params.now,
      params.now,
      {
        trafficSource: params.trafficSource,
        channelKey: params.trafficSource.channel(),
        occurrenceCount: 1,
        lastSeenAt: params.now,
      }
    );
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: TrafficSourceEntityProps;
  }): TrafficSourceEntity {
    return new TrafficSourceEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props
    );
  }

  get trafficSource(): TrafficSourceVO { return this.props.trafficSource; }
  get channelKey(): string { return this.props.channelKey; }
  get occurrenceCount(): number { return this.props.occurrenceCount; }
  get lastSeenAt(): string { return this.props.lastSeenAt; }

  markSeen(now: string): void {
    this.props.occurrenceCount += 1;
    this.props.lastSeenAt = now;
  }

  isPaid(): boolean {
    return this.props.trafficSource.source.isPaid();
  }

  isOrganic(): boolean {
    return this.props.trafficSource.source.isOrganic();
  }

  hasCampaign(): boolean {
    return this.props.trafficSource.hasCampaign();
  }
}
