import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';

export interface ModelArtifactProps {
  readonly type: string;
  readonly url: string;
  readonly sizeBytes: number | null;
  readonly checksum: string | null;
}

export class ModelArtifactVO extends BaseVO<ModelArtifactProps> {
  static create(props: ModelArtifactProps): ModelArtifactVO {
    if (!props.type || props.type.trim().length === 0) {
      throw new Error('ModelArtifact: type cannot be empty');
    }
    if (!props.url || props.url.trim().length === 0) {
      throw new Error('ModelArtifact: url cannot be empty');
    }
    if (props.sizeBytes !== null && props.sizeBytes < 0) {
      throw new Error('ModelArtifact: sizeBytes cannot be negative');
    }
    return new ModelArtifactVO(props);
  }

  private constructor(props: ModelArtifactProps) {
    super(Object.freeze({ ...props }));
  }

  get type(): string { return this.value.type; }
  get url(): string { return this.value.url; }
  get sizeBytes(): number | null { return this.value.sizeBytes; }
  get checksum(): string | null { return this.value.checksum; }
}
