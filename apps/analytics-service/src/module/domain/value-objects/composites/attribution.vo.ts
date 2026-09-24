import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { AttributionModelVO } from '../primitives/attribution-model.vo';

export interface AttributionProps {
  readonly model: AttributionModelVO;
  readonly touchpoints: readonly string[];
  readonly conversionValue: number;
}

export class AttributionVO extends BaseVO<AttributionProps> {
  static create(props: AttributionProps): AttributionVO {
    if (props.touchpoints.length === 0) {
      throw new Error('Attribution requires at least one touchpoint');
    }
    if (props.conversionValue < 0) {
      throw new Error('Conversion value cannot be negative');
    }
    return new AttributionVO(
      Object.freeze({
        ...props,
        touchpoints: Object.freeze([...props.touchpoints]),
      }),
    );
  }

  private constructor(value: AttributionProps) {
    super(value);
  }

  get model(): AttributionModelVO { return this.value.model; }
  get touchpoints(): readonly string[] { return this.value.touchpoints; }
  get conversionValue(): number { return this.value.conversionValue; }

  getWeights(): readonly number[] {
    return this.value.model.weights(this.value.touchpoints.length);
  }

  getCredits(): readonly { readonly touchpoint: string; readonly credit: number }[] {
    const weights = this.getWeights();
    return this.value.touchpoints.map((tp, i) => ({
      touchpoint: tp,
      credit: (weights[i] ?? 0) * this.value.conversionValue,
    }));
  }

  getTopTouchpoint(): { readonly touchpoint: string; readonly credit: number } {
    const credits = this.getCredits();
    return credits.reduce((top, c) => (c.credit > top.credit ? c : top), credits[0]!);
  }
}
