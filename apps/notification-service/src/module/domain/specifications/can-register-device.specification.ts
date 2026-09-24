import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';

export interface CanRegisterDeviceCandidate {
  readonly existingCount: number;
  readonly maxDevices: number;
}

export class CanRegisterDeviceSpecification extends Specification<CanRegisterDeviceCandidate> {
  isSatisfiedBy(candidate: CanRegisterDeviceCandidate): boolean {
    return candidate.existingCount < candidate.maxDevices;
  }
}
