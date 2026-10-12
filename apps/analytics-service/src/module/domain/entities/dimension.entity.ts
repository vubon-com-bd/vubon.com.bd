/**
 * Dimension Entity (Aggregate Root)
 * @module analytics-service/domain/entities
 *
 * Analytics dimension definition — catalog entry.
 * Business Rule:
 * - Name unique within tenant
 * - Type fixed at creation
 * - Cannot delete if used in any aggregation
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base';
import { DimensionIdVO } from '../value-objects/primitives/dimension-id.vo.js';
import { DimensionNameVO } from '../value-objects/primitives/dimension-name.vo.js';

export interface DimensionEntityProps {
  readonly name: DimensionNameVO;
  readonly description?: string;
  readonly isCustom: boolean;
  isActive: boolean;
  usageCount: number;
}

export class DimensionEntity extends AggregateRoot<string> {
  private props: DimensionEntityProps;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: DimensionEntityProps
  ) {
    super(id, createdAt, updatedAt, null);
    this.props = props;
  }

  static create(params: {
    id: DimensionIdVO;
    name: DimensionNameVO;
    description?: string;
    now: string;
  }): DimensionEntity {
    if (!params.id || !params.name) {
      throw new Error('DimensionEntity requires id, name');
    }

    return new DimensionEntity(
      params.id.value,
      params.now,
      params.now,
      {
        name: params.name,
        description: params.description?.trim(),
        isCustom: params.name.isCustom(),
        isActive: true,
        usageCount: 0,
      }
    );
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: DimensionEntityProps;
  }): DimensionEntity {
    return new DimensionEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props
    );
  }

  get name(): DimensionNameVO { return this.props.name; }
  get description(): string | undefined { return this.props.description; }
  get isCustom(): boolean { return this.props.isCustom; }
  get isActive(): boolean { return this.props.isActive; }
  get usageCount(): number { return this.props.usageCount; }

  activate(): void {
    if (this.props.isActive) return;
    this.props.isActive = true;
    this.incrementVersion();
  }

  deactivate(): void {
    if (!this.props.isActive) return;
    this.props.isActive = false;
    this.incrementVersion();
  }

  incrementUsage(): void {
    this.props.usageCount += 1;
  }

  decrementUsage(): void {
    if (this.props.usageCount > 0) {
      this.props.usageCount -= 1;
    }
  }

  canDelete(): boolean {
    return this.props.usageCount === 0;
  }

  isTemporal(): boolean { return this.name.isTemporal(); }
  isGeographic(): boolean { return this.name.isGeographic(); }
  isTechnical(): boolean { return this.name.isTechnical(); }
  isTraffic(): boolean { return this.name.isTraffic(); }
  isBusiness(): boolean { return this.name.isBusiness(); }
}
