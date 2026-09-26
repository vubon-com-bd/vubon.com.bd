import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { AI_MODEL_TYPE } from '@vubon/shared-constants/ai';

const VALID = new Set<string>(Object.values(AI_MODEL_TYPE));

export class ModelTypeVO extends BaseTypeVO<string> {
  static create(raw: string): ModelTypeVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid model type: ${raw}`);
    }
    return new ModelTypeVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }

  isLlm(): boolean { return this.value === AI_MODEL_TYPE.LLM; }
  isEmbedding(): boolean { return this.value === AI_MODEL_TYPE.EMBEDDING; }
  isRecommendation(): boolean { return this.value === AI_MODEL_TYPE.RECOMMENDATION; }
  isClassification(): boolean { return this.value === AI_MODEL_TYPE.CLASSIFICATION; }
}
