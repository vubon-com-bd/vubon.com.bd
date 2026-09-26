import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { AI_MODEL_STATUS } from '@vubon/shared-constants/ai';

const VALID_STATUSES = new Set<string>(Object.values(AI_MODEL_STATUS));

export class ModelStatusVO extends BaseStatusVO<string> {
  static create(raw: string): ModelStatusVO {
    if (!VALID_STATUSES.has(raw)) {
      throw new Error(`Invalid model status: ${raw}`);
    }
    return new ModelStatusVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }

  isDraft(): boolean { return this.value === AI_MODEL_STATUS.DRAFT; }
  isDeployed(): boolean { return this.value === AI_MODEL_STATUS.DEPLOYED; }
  isTraining(): boolean { return this.value === AI_MODEL_STATUS.TRAINING; }
  isDeprecated(): boolean { return this.value === AI_MODEL_STATUS.DEPRECATED; }
  isFailed(): boolean { return this.value === AI_MODEL_STATUS.FAILED; }

  canDeploy(): boolean {
    return this.value === AI_MODEL_STATUS.TRAINED;
  }
}
