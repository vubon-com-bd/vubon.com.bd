import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { PersonalizationIdVO } from '../primitives/personalization-id.vo';
import { PersonalizationTypeVO } from '../primitives/personalization-type.vo';
import { PersonalizationSignalVO } from '../primitives/personalization-signal.vo';
import { PersonalizationStatusVO } from '../primitives/personalization-status.vo';
import { PersonalizationProfileVO } from './personalization-profile.vo';

export interface PersonalizationProps {
  readonly id: PersonalizationIdVO;
  readonly type: PersonalizationTypeVO;
  readonly signal: PersonalizationSignalVO;
  readonly status: PersonalizationStatusVO;
  readonly profile: PersonalizationProfileVO;
  readonly confidence: number;
}

export class PersonalizationVO extends BaseVO<PersonalizationProps> {
  static create(props: PersonalizationProps): PersonalizationVO {
    if (props.confidence < 0 || props.confidence > 1) {
      throw new Error('Personalization: confidence must be in [0,1]');
    }
    return new PersonalizationVO(props);
  }

  private constructor(props: PersonalizationProps) {
    super(Object.freeze({ ...props }));
  }

  get id(): PersonalizationIdVO { return this.value.id; }
  get type(): PersonalizationTypeVO { return this.value.type; }
  get signal(): PersonalizationSignalVO { return this.value.signal; }
  get status(): PersonalizationStatusVO { return this.value.status; }
  get profile(): PersonalizationProfileVO { return this.value.profile; }
  get confidence(): number { return this.value.confidence; }

  isReady(): boolean {
    return this.value.status.isReady();
  }
}
