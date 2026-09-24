import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { PreferenceIdVO } from '../primitives/preference-id.vo';
import { PreferenceTypeVO } from '../primitives/preference-type.vo';
import { PreferenceOptionVO } from '../primitives/preference-option.vo';
import { PreferenceValueVO } from '../primitives/preference-value.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface PreferenceProps {
  readonly id: PreferenceIdVO;
  readonly userId: UserIdVO;
  readonly type: PreferenceTypeVO;
  readonly option: PreferenceOptionVO;
  readonly preferenceValue: PreferenceValueVO;
}

export class PreferenceVO extends BaseVO<PreferenceProps> {
  private constructor(props: PreferenceProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: PreferenceProps): PreferenceVO {
    return new PreferenceVO(props);
  }

  get id(): PreferenceIdVO { return this.value.id; }
  get userId(): UserIdVO { return this.value.userId; }
  get type(): PreferenceTypeVO { return this.value.type; }
  get option(): PreferenceOptionVO { return this.value.option; }
  get preferenceValue(): PreferenceValueVO { return this.value.preferenceValue; }
}
