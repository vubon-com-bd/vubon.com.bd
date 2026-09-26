import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { DriverIdVO } from '../primitives/driver-id.vo';
import { DriverNameVO } from '../primitives/driver-name.vo';
import { DriverStatusVO } from '../primitives/driver-status.vo';
import { DriverTypeVO } from '../primitives/driver-type.vo';
import { DriverLicenseVO } from '../primitives/driver-license.vo';

export interface DriverProps {
  readonly id: DriverIdVO;
  readonly name: DriverNameVO;
  readonly license: DriverLicenseVO;
  readonly type: DriverTypeVO;
  readonly status: DriverStatusVO;
  readonly phone: string;
}

export class DriverVO extends BaseVO<DriverProps> {
  private constructor(props: DriverProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: DriverProps): DriverVO {
    return new DriverVO(props);
  }

  get id(): DriverIdVO { return this.value.id; }
  get name(): DriverNameVO { return this.value.name; }
  get license(): DriverLicenseVO { return this.value.license; }
  get type(): DriverTypeVO { return this.value.type; }
  get status(): DriverStatusVO { return this.value.status; }
  get phone(): string { return this.value.phone; }
}
