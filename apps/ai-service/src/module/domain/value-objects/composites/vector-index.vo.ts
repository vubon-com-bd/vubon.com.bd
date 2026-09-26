import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { VectorIdVO } from '../primitives/vector-id.vo';
import { VectorIndexTypeVO } from '../primitives/vector-index-type.vo';
import { VectorNameVO } from '../primitives/vector-name.vo';
import { VectorStatusVO } from '../primitives/vector-status.vo';

export interface VectorIndexProps {
  readonly id: VectorIdVO;
  readonly name: VectorNameVO;
  readonly type: VectorIndexTypeVO;
  readonly dimension: number;
  readonly provider: string;
  readonly status: VectorStatusVO;
  readonly entryCount: number;
}

export class VectorIndexVO extends BaseVO<VectorIndexProps> {
  static create(props: VectorIndexProps): VectorIndexVO {
    if (props.dimension < 1) {
      throw new Error('VectorIndex: dimension must be >= 1');
    }
    if (props.entryCount < 0) {
      throw new Error('VectorIndex: entryCount cannot be negative');
    }
    return new VectorIndexVO(props);
  }

  private constructor(props: VectorIndexProps) {
    super(Object.freeze({ ...props }));
  }

  get id(): VectorIdVO { return this.value.id; }
  get name(): VectorNameVO { return this.value.name; }
  get type(): VectorIndexTypeVO { return this.value.type; }
  get dimension(): number { return this.value.dimension; }
  get provider(): string { return this.value.provider; }
  get status(): VectorStatusVO { return this.value.status; }
  get entryCount(): number { return this.value.entryCount; }

  isReady(): boolean {
    return this.value.status.isReady();
  }

  isEmpty(): boolean {
    return this.value.entryCount === 0;
  }
}
