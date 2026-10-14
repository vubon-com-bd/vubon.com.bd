import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetSuspensionQuery } from './get-suspension.query.js';
import {
  VENDOR_SUSPENSION_SERVICE,
  type IVendorSuspensionService,
} from '../../services/interfaces/vendor-suspension.service.interface.js';
import type { SuspensionResponseDTO } from '../../dtos/responses/suspension-response.dto.js';

@QueryHandler(GetSuspensionQuery)
export class GetSuspensionHandler
  implements IQueryHandler<GetSuspensionQuery, SuspensionResponseDTO>
{
  constructor(
    @Inject(VENDOR_SUSPENSION_SERVICE)
    private readonly service: IVendorSuspensionService,
  ) {}

  async execute(q: GetSuspensionQuery): Promise<SuspensionResponseDTO> {
    return this.service.getById(q.suspensionId);
  }
}
