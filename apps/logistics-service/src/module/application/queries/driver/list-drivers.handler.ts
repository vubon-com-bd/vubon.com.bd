import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListDriversQuery } from './list-drivers.query.js';
import { DRIVER_SERVICE, type IDriverService } from '@application/services/interfaces/driver.service.interface';
import type { DriverListResponseDTO } from '@application/dtos/responses/driver/index.js';

@QueryHandler(ListDriversQuery)
export class ListDriversHandler implements IQueryHandler<ListDriversQuery, DriverListResponseDTO> {
  constructor(@Inject(DRIVER_SERVICE) private readonly service: IDriverService) {}
  async execute(q: ListDriversQuery): Promise<DriverListResponseDTO> { return this.service.list(q.options); }
}
