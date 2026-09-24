import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { SUPPORT_SLA_METRIC } from '@vubon/shared-constants/support';

const VALID = new Set<string>(Object.values(SUPPORT_SLA_METRIC));

export class SlaTypeVO extends BaseTypeVO<string> {
  static create(value: string): SlaTypeVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid SLA type: ${value}`);
    }
    return new SlaTypeVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
