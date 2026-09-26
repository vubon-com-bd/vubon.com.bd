import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { FunnelIdVO } from '../value-objects/primitives/funnel-id.vo';
import { FunnelStepVO } from '../value-objects/primitives/funnel-step.vo';
import {
  FunnelCreatedEvent,
  FunnelAnalyzedEvent,
} from '../events/funnel.events';

export interface FunnelEntityProps {
  readonly name: string;
  readonly steps: readonly FunnelStepVO[];
}

export class FunnelEntity extends AggregateRoot<FunnelIdVO> {
  private readonly _name: string;
  private readonly _steps: readonly FunnelStepVO[];

  private constructor(
    id: FunnelIdVO,
    props: FunnelEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._steps = Object.freeze([...props.steps]);
  }

  static create(props: FunnelEntityProps): FunnelEntity {
    if (props.steps.length < 2) {
      throw new Error('Funnel must have at least 2 steps');
    }
    const seen = new Set<string>();
    for (const step of props.steps) {
      if (seen.has(step.normalized)) {
        throw new Error(`Duplicate step: ${step.value}`);
      }
      seen.add(step.normalized);
    }
    const now = new Date().toISOString();
    const id = FunnelIdVO.create(crypto.randomUUID());
    const entity = new FunnelEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new FunnelCreatedEvent(id.value, id.value, props.name, props.steps.length, 0),
    );
    return entity;
  }

  static reconstitute(
    id: FunnelIdVO,
    props: FunnelEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): FunnelEntity {
    return new FunnelEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  markAnalyzed(): FunnelEntity {
    const now = new Date().toISOString();
    const updated = new FunnelEntity(
      this.id,
      this._toProps(),
      this.createdAt,
      now,
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new FunnelAnalyzedEvent(
        this.id.value,
        this.id.value,
        this._steps.length,
        this.version + 1,
      ),
    );
    return updated;
  }

  get name(): string { return this._name; }
  get steps(): readonly FunnelStepVO[] { return this._steps; }
  get stepCount(): number { return this._steps.length; }

  getStepAt(index: number): FunnelStepVO | null {
    return this._steps[index] ?? null;
  }

  private _toProps(): FunnelEntityProps {
    return { name: this._name, steps: this._steps };
  }
}
