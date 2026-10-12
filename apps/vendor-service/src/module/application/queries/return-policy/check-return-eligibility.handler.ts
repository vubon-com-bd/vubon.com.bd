import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CheckReturnEligibilityQuery } from './check-return-eligibility.query.js';
import {
  VENDOR_RETURN_POLICY_SERVICE,
  type IVendorReturnPolicyService,
} from '../../services/interfaces/vendor-return-policy.service.interface.js';

@QueryHandler(CheckReturnEligibilityQuery)
export class CheckReturnEligibilityHandler
  implements IQueryHandler<CheckReturnEligibilityQuery, boolean>
{
  constructor(@Inject(VENDOR_RETURN_POLICY_SERVICE) private readonly service: IVendorReturnPolicyService) {}
  async execute(query: CheckReturnEligibilityQuery): Promise<boolean> {
    return this.service.canReturn(query.vendorId, query.deliveredAt);
  }
}
