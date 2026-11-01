import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetDispatchQuery } from './get-dispatch.query.js';
import { DISPATCH_SERVICE, type IDispatchService } from '@application/services/interfaces/dispatch.service.interface';
import type { DispatchResponseDTO } from '@application/dtos/responses/dispatch/index.js';

@QueryHandler(GetDispatchQuery)
export class GetDispatchHandler implements IQueryHandler<GetDispatchQuery, DispatchResponseDTO> {
  constructor(@Inject(DISPATCH_SERVICE) private readonly service: IDispatchService) {}
  async execute(q: GetDispatchQuery): Promise<DispatchResponseDTO> { return this.service.getById(q.dispatchId); }
}
