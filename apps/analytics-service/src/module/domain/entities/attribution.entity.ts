/**
 * Attribution Entity (Aggregate Root)
 * @module analytics-service/domain/entities
 *
 * Multi-touch attribution record for a conversion।
 * Business Rule:
 * - Immutable after creation
 * - Model fixed
 * - Weights must sum to 1
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base';
import { AttributionVO } from '../value-objects/composites/attribution.vo.js';
import { AttributionComputedEvent } from '../events/attribution.events.js';

export interface AttributionEntityProps {
  readonly attribution: AttributionVO;
  readonly computedAt: string;
}

export class AttributionEntity extends AggregateRoot<string> {
  private props: AttributionEntityProps;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: AttributionEntityProps
  ) {
    super(id, createdAt, updatedAt, null);
    this.props = props;
  }

  static create(params: {
    id: string;
    attribution: AttributionVO;
    now: string;
  }): AttributionEntity {
    if (!params.attribution) {
      throw new Error('AttributionEntity requires attribution');
    }

    const entity = new AttributionEntity(
      params.id,
      params.now,
      params.now,
      {
        attribution: params.attribution,
        computedAt: params.now,
      }
    );

    entity.addDomainEvent(
      new AttributionComputedEvent(
        params.attribution.conversionId,
        params.attribution.model,
        params.attribution.touchpointCount(),
        params.attribution.conversionValue,
        params.now
      )
    );
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: AttributionEntityProps;
  }): AttributionEntity {
    return new AttributionEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props
    );
  }

  get attribution(): AttributionVO { return this.props.attribution; }
  get computedAt(): string { return this.props.computedAt; }

  conversionId(): string {
    return this.props.attribution.conversionId;
  }

  touchpointCount(): number {
    return this.props.attribution.touchpointCount();
  }

  conversionValue(): number {
    return this.props.attribution.conversionValue;
  }

  creditByChannel(): Record<string, number> {
    return this.props.attribution.creditByChannel();
  }
}
