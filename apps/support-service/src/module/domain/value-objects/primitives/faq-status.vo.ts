import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { FAQ_STATUS } from '@vubon/shared-constants/support';

const VALID = new Set<string>(Object.values(FAQ_STATUS));

export class FaqStatusVO extends BaseStatusVO<string> {
  static create(value: string): FaqStatusVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid FAQ status: ${value}`);
    }
    return new FaqStatusVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
