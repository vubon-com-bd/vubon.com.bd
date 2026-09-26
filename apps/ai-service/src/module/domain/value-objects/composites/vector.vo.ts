import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { VectorIdVO } from '../primitives/vector-id.vo';
import { VectorNameVO } from '../primitives/vector-name.vo';
import { VectorDimensionVO } from '../primitives/vector-dimension.vo';
import { VectorIndexTypeVO } from '../primitives/vector-index-type.vo';
import { VectorIndexVO } from './vector-index.vo';

export interface VectorProps {
  readonly id: VectorIdVO;
  readonly name: VectorNameVO;
  readonly dimension: VectorDimensionVO;
  readonly values: readonly number[];
  readonly index: VectorIndexVO | null;
  readonly metadata: Readonly<Record<string, string | number | boolean>>;
}

export class VectorVO extends BaseVO<VectorProps> {
  static create(props: VectorProps): VectorVO {
    if (props.values.length !== props.dimension.value) {
      throw new Error(
        `Vector: values length (${props.values.length}) != dimension (${props.dimension.value})`,
      );
    }
    return new VectorVO(props);
  }

  private constructor(props: VectorProps) {
    super(
      Object.freeze({
        ...props,
        values: Object.freeze([...props.values]),
        metadata: Object.freeze({ ...props.metadata }),
      }),
    );
  }

  get id(): VectorIdVO { return this.value.id; }
  get name(): VectorNameVO { return this.value.name; }
  get dimension(): VectorDimensionVO { return this.value.dimension; }
  get values(): readonly number[] { return this.value.values; }
  get index(): VectorIndexVO | null { return this.value.index; }
  get metadata(): Readonly<Record<string, string | number | boolean>> {
    return this.value.metadata;
  }

  get magnitude(): number {
    return Math.sqrt(this.value.values.reduce((sum, v) => sum + v * v, 0));
  }

  isNormalized(): boolean {
    const mag = this.magnitude;
    return Math.abs(mag - 1) < 1e-6;
  }
}
