/**
 * Dimension Value Entity
 * @module analytics-service/domain/entities
 *
 * Distinct value of a dimension (e.g., "BD" for country)।
 * Business Rule:
 * - Unique (dimensionId, value) pair
 * - Used in GROUP BY queries
 * - Auto-created when new value seen
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base';
import { DimensionIdVO } from '../value-objects/primitives/dimension-id.vo.js';
import { DimensionValueVO } from '../value-objects/primitives/dimension-value.vo.js';

export interface DimensionValueEntityProps {
  readonly dimensionId: DimensionIdVO;
  readonly value: DimensionValueVO;
  occurrenceCount: number;
  firstSeenAt: string;
  lastSeenAt: string;
}

export class DimensionValueEntity extends BaseEntity<string> {
  private props: DimensionValueEntityProps;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: DimensionValueEntityProps
  ) {
    super(id, createdAt, updatedAt, null);
    this.props = props;
  }

  static create(params: {
    id: string;
    dimensionId: DimensionIdVO;
    value: DimensionValueVO;
    now: string;
  }): DimensionValueEntity {
    if (!params.dimensionId || !params.value) {
      throw new Error('DimensionValueEntity requires dimensionId, value');
    }

    return new DimensionValueEntity(
      params.id,
      params.now,
      params.now,
      {
        dimensionId: params.dimensionId,
        value: params.value,
        occurrenceCount: 1,
        firstSeenAt: params.now,
        lastSeenAt: params.now,
      }
    );
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: DimensionValueEntityProps;
  }): DimensionValueEntity {
    return new DimensionValueEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props
    );
  }

  get dimensionId(): DimensionIdVO { return this.props.dimensionId; }
  get value(): DimensionValueVO { return this.props.value; }
  get occurrenceCount(): number { return this.props.occurrenceCount; }
  get firstSeenAt(): string { return this.props.firstSeenAt; }
  get lastSeenAt(): string { return this.props.lastSeenAt; }

  markSeen(now: string): void {
    this.props.occurrenceCount += 1;
    this.props.lastSeenAt = now;
  }

  isHighFrequency(): boolean {
    return this.props.occurrenceCount >= 1000;
  }
}
