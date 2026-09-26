import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ClusterIdVO } from '../primitives/cluster-id.vo';
import { VectorIdVO } from '../primitives/vector-id.vo';
import { ClusterResultVO } from './cluster-result.vo';

export interface ClusterProps {
  readonly id: ClusterIdVO;
  readonly vectorIds: readonly VectorIdVO[];
  readonly algorithm: string;
  readonly result: ClusterResultVO;
}

export class ClusterVO extends BaseVO<ClusterProps> {
  static create(props: ClusterProps): ClusterVO {
    if (props.vectorIds.length === 0) {
      throw new Error('Cluster: vectorIds cannot be empty');
    }
    return new ClusterVO(props);
  }

  private constructor(props: ClusterProps) {
    super(
      Object.freeze({
        ...props,
        vectorIds: Object.freeze([...props.vectorIds]),
      }),
    );
  }

  get id(): ClusterIdVO { return this.value.id; }
  get vectorIds(): readonly VectorIdVO[] { return this.value.vectorIds; }
  get algorithm(): string { return this.value.algorithm; }
  get result(): ClusterResultVO { return this.value.result; }

  vectorCount(): number {
    return this.value.vectorIds.length;
  }
}
