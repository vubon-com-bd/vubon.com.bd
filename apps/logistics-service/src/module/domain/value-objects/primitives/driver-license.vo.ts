import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

export class DriverLicenseVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DriverLicenseVO {
    BaseCodeVO.validateNonEmpty(raw, 'DriverLicense');
    if (raw.length < 6 || raw.length > 30) {
      throw new Error(`Invalid license number: ${raw}`);
    }
    return new DriverLicenseVO(raw);
  }
}
