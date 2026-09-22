import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';

export interface PlaceOrderContext {
  readonly customerId: string | null;
  readonly itemsCount: number;
}

export class CanPlaceOrderSpecification extends Specification<PlaceOrderContext> {
  isSatisfiedBy(candidate: PlaceOrderContext): boolean {
    if (!candidate.customerId) return false;
    if (candidate.itemsCount < 1) return false;
    return true;
  }
}
