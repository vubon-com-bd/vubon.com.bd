import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { DispatchEntity } from '../entities/dispatch.entity';

export class CanDispatchSpecification extends Specification<DispatchEntity> {
  isSatisfiedBy(dispatch: DispatchEntity): boolean {
    if (dispatch.isDeleted()) return false;
    return dispatch.vehicleId !== null && dispatch.driverId !== null;
  }
}
