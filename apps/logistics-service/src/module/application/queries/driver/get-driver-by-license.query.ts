import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetDriverByLicenseQuery extends BaseQuery {
  readonly type = 'logistics.driver.by_license';
  constructor(public readonly licenseNumber: string) { super(); }
}
