import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetDispatchQuery } from './get-dispatch.query.js';
import { DISPATCH_SERVICE, type IDispatchService } from '../../services/interfaces/dispatch.service.interface.js';
import type { DispatchResponseDTO } from '../../dtos/responses/dispatch/dispatch-response.dto.js';
@QueryHandler(GetDispatchQuery)
export class GetDispatchHandler implements IQueryHandler<GetDispatchQuery, DispatchResponseDTO> {
  constructor(@Inject(DISPATCH_SERVICE) private readonly service: IDispatchService) {}
  async execute(q: GetDispatchQuery): Promise<DispatchResponseDTO> { return this.service.getById(q.dispatchId); }
}
