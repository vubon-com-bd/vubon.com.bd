import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetReturnPolicyQuery } from './get-return-policy.query.js';
import {
  VENDOR_RETURN_POLICY_SERVICE,
  type IVendorReturnPolicyService,
  type ReturnPolicyDTO,
} from '../../services/interfaces/vendor-return-policy.service.interface.js';

@QueryHandler(GetReturnPolicyQuery)
export class GetReturnPolicyHandler
  implements IQueryHandler<GetReturnPolicyQuery, ReturnPolicyDTO | null>
{
  constructor(
    @Inject(VENDOR_RETURN_POLICY_SERVICE)
    private readonly service: IVendorReturnPolicyService,
  ) {}

  async execute(q: GetReturnPolicyQuery): Promise<ReturnPolicyDTO | null> {
    return this.service.getByVendorId(q.vendorId);
  }
}
