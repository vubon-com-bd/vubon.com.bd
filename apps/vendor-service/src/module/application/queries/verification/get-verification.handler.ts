import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetVerificationQuery } from './get-verification.query.js';
import {
  VENDOR_VERIFICATION_SERVICE,
  type IVendorVerificationService,
} from '../../services/interfaces/vendor-verification.service.interface.js';
import type { VerificationResponseDTO } from '../../dtos/responses/verification-response.dto.js';

@QueryHandler(GetVerificationQuery)
export class GetVerificationHandler
  implements IQueryHandler<GetVerificationQuery, VerificationResponseDTO>
{
  constructor(
    @Inject(VENDOR_VERIFICATION_SERVICE)
    private readonly service: IVendorVerificationService,
  ) {}

  async execute(q: GetVerificationQuery): Promise<VerificationResponseDTO> {
    return this.service.getById(q.verificationId);
  }
}
