import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { CONVERSATION_TYPE } from '@vubon/shared-constants/support';

const VALID = new Set<string>(Object.values(CONVERSATION_TYPE));

export class ConversationTypeVO extends BaseTypeVO<string> {
  static create(value: string): ConversationTypeVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid conversation type: ${value}`);
    }
    return new ConversationTypeVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
