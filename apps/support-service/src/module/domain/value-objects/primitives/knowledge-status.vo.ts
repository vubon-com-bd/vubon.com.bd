import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { KNOWLEDGE_BASE_STATUS } from '@vubon/shared-constants/support';

const VALID = new Set<string>(Object.values(KNOWLEDGE_BASE_STATUS));

export class KnowledgeStatusVO extends BaseStatusVO<string> {
  static create(value: string): KnowledgeStatusVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid knowledge status: ${value}`);
    }
    return new KnowledgeStatusVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
