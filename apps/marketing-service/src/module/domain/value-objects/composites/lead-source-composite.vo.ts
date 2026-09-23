import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { LeadSourceVO } from '../primitives/lead-source.vo';

export interface LeadSourceCompositeProps {
  readonly source: LeadSourceVO;
  readonly utmData: Readonly<Record<string, string>>;
}

export class LeadSourceCompositeVO extends BaseVO<LeadSourceCompositeProps> {
  private constructor(props: LeadSourceCompositeProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: LeadSourceCompositeProps): LeadSourceCompositeVO {
    return new LeadSourceCompositeVO(props);
  }

  get source(): LeadSourceVO { return this.value.source; }
  get utmData(): Readonly<Record<string, string>> { return this.value.utmData; }
}
