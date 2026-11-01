import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { ClassifyPostalCodeRequestDTO } from '@application/dtos/requests/zone/index.js';
export class ClassifyZoneQuery extends BaseQuery {
  readonly type = 'logistics.zone.classify';
  constructor(public readonly dto: ClassifyPostalCodeRequestDTO) { super(); }
}
