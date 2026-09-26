import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';

export interface ModelMetadataProps {
  readonly framework: string | null;
  readonly architecture: string | null;
  readonly parameters: number | null;
  readonly license: string | null;
  readonly tags: readonly string[];
}

export class ModelMetadataVO extends BaseVO<ModelMetadataProps> {
  static create(props: ModelMetadataProps): ModelMetadataVO {
    if (props.parameters !== null && props.parameters < 0) {
      throw new Error('ModelMetadata: parameters cannot be negative');
    }
    return new ModelMetadataVO(props);
  }

  private constructor(props: ModelMetadataProps) {
    super(Object.freeze({ ...props, tags: Object.freeze([...props.tags]) }));
  }

  get framework(): string | null { return this.value.framework; }
  get architecture(): string | null { return this.value.architecture; }
  get parameters(): number | null { return this.value.parameters; }
  get license(): string | null { return this.value.license; }
  get tags(): readonly string[] { return this.value.tags; }

  hasTag(tag: string): boolean {
    return this.value.tags.includes(tag);
  }
}
