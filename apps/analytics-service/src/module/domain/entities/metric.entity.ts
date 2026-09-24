import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { MetricIdVO } from '../value-objects/primitives/metric-id.vo';
import { MetricNameVO } from '../value-objects/primitives/metric-name.vo';
import { MetricValueVO } from '../value-objects/primitives/metric-value.vo';
import { MetricUnitVO } from '../value-objects/primitives/metric-unit.vo';
import { MetricTypeVO } from '../value-objects/primitives/metric-type.vo';
import {
  MetricRecordedEvent,
  MetricAggregatedEvent,
} from '../events/metric.events';

export interface MetricEntityProps {
  readonly name: MetricNameVO;
  readonly value: MetricValueVO;
  readonly unit: MetricUnitVO;
  readonly type: MetricTypeVO;
  readonly window: { readonly startMs: number; readonly endMs: number } | null;
}

export class MetricEntity extends AggregateRoot<MetricIdVO> {
  private readonly _name: MetricNameVO;
  private readonly _value: MetricValueVO;
  private readonly _unit: MetricUnitVO;
  private readonly _type: MetricTypeVO;
  private readonly _window: { readonly startMs: number; readonly endMs: number } | null;

  private constructor(
    id: MetricIdVO,
    props: MetricEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._value = props.value;
    this._unit = props.unit;
    this._type = props.type;
    this._window = props.window;
  }

  static create(props: MetricEntityProps): MetricEntity {
    const now = new Date().toISOString();
    const id = MetricIdVO.create(crypto.randomUUID());
    const entity = new MetricEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new MetricRecordedEvent(
        id.value,
        id.value,
        props.name.value,
        props.value.numeric,
        0,
      ),
    );
    return entity;
  }

  static reconstitute(
    id: MetricIdVO,
    props: MetricEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): MetricEntity {
    return new MetricEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  recordValue(value: MetricValueVO): MetricEntity {
    if (value.numeric < 0 && !this._type.value.includes('delta')) {
      throw new Error('Negative value not allowed for non-delta metric');
    }
    const now = new Date().toISOString();
    const updated = new MetricEntity(
      this.id,
      { ...this._toProps(), value },
      this.createdAt,
      now,
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new MetricAggregatedEvent(
        this.id.value,
        this.id.value,
        value.numeric,
        this.version + 1,
      ),
    );
    return updated;
  }

  get name(): MetricNameVO { return this._name; }
  get value(): MetricValueVO { return this._value; }
  get unit(): MetricUnitVO { return this._unit; }
  get type(): MetricTypeVO { return this._type; }
  get window(): { readonly startMs: number; readonly endMs: number } | null { return this._window; }

  private _toProps(): MetricEntityProps {
    return {
      name: this._name,
      value: this._value,
      unit: this._unit,
      type: this._type,
      window: this._window,
    };
  }
}
