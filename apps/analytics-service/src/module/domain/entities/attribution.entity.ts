import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { AttributionModelVO } from '../value-objects/primitives/attribution-model.vo';
import { AttributionComputedEvent } from '../events/attribution.events';

export interface AttributionEntityProps {
  readonly model: AttributionModelVO;
  readonly conversionId: string;
  readonly touchpoints: readonly string[];
  readonly conversionValue: number;
}

export class AttributionEntity extends AggregateRoot<string> {
  private readonly _model: AttributionModelVO;
  private readonly _conversionId: string;
  private readonly _touchpoints: readonly string[];
  private readonly _conversionValue: number;

  private constructor(
    id: string,
    props: AttributionEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._model = props.model;
    this._conversionId = props.conversionId;
    this._touchpoints = Object.freeze([...props.touchpoints]);
    this._conversionValue = props.conversionValue;
  }

  static create(props: AttributionEntityProps): AttributionEntity {
    if (props.touchpoints.length === 0) {
      throw new Error('Attribution requires at least one touchpoint');
    }
    if (props.conversionValue < 0) {
      throw new Error('Conversion value cannot be negative');
    }
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    const entity = new AttributionEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new AttributionComputedEvent(
        id,
        id,
        props.model.value,
        props.touchpoints.length,
        props.conversionValue,
        0,
      ),
    );
    return entity;
  }

  static reconstitute(
    id: string,
    props: AttributionEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): AttributionEntity {
    return new AttributionEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get model(): AttributionModelVO { return this._model; }
  get conversionId(): string { return this._conversionId; }
  get touchpoints(): readonly string[] { return this._touchpoints; }
  get conversionValue(): number { return this._conversionValue; }

  /**
   * Compute per-touchpoint credits using model weights.
   */
  computeCredits(): readonly { readonly touchpoint: string; readonly credit: number }[] {
    const weights = this._model.weights(this._touchpoints.length);
    return this._touchpoints.map((tp, i) => ({
      touchpoint: tp,
      credit: (weights[i] ?? 0) * this._conversionValue,
    }));
  }

  /**
   * Return the touchpoint with the highest attributed credit.
   */
  getTopTouchpoint(): { readonly touchpoint: string; readonly credit: number } {
    const credits = this.computeCredits();
    if (credits.length === 0) {
      return { touchpoint: '', credit: 0 };
    }
    return credits.reduce(
      (top, c) => (c.credit > top.credit ? c : top),
      credits[0]!,
    );
  }

  private _toProps(): AttributionEntityProps {
    return {
      model: this._model,
      conversionId: this._conversionId,
      touchpoints: this._touchpoints,
      conversionValue: this._conversionValue,
    };
  }
}
