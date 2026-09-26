import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

const SEMVER_REGEX = /^\d+\.\d+\.\d+(-[a-zA-Z0-9.]+)?$/;

export class ModelVersionVO extends BaseCodeVO {
  static create(raw: string): ModelVersionVO {
    BaseCodeVO.validateNonEmpty(raw, 'ModelVersion');
    if (!SEMVER_REGEX.test(raw)) {
      throw new Error(`Invalid semver format: ${raw}`);
    }
    return new ModelVersionVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }

  get major(): number {
    return Number(this.value.split('.')[0]);
  }

  get minor(): number {
    return Number(this.value.split('.')[1]);
  }

  get patch(): number {
    return Number(this.value.split('.')[2].split('-')[0]);
  }
}
