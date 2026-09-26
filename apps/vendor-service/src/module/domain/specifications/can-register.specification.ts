import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { VendorEntity } from '../entities/vendor.entity';

export class CanRegisterSpecification extends Specification<VendorEntity | null> {
  isSatisfiedBy(candidate: VendorEntity | null): boolean {
    return candidate === null;
  }
}
