import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetDispatchByNumberQuery } from './get-dispatch-by-number.query.js';
import { DISPATCH_SERVICE, type IDispatchService } from '@application/services/interfaces/dispatch.service.interface';
import type { DispatchResponseDTO } from '@application/dtos/responses/dispatch/index.js';

@QueryHandler(GetDispatchByNumberQuery)
export class GetDispatchByNumberHandler implements IQueryHandler<GetDispatchByNumberQuery, DispatchResponseDTO> {
  constructor(@Inject(DISPATCH_SERVICE) private readonly service: IDispatchService) {}
  async execute(q: GetDispatchByNumberQuery): Promise<DispatchResponseDTO> { return this.service.getByNumber(q.dispatchNumber); }
}
