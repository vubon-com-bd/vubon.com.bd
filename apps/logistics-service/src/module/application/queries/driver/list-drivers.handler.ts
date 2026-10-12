import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListDriversQuery } from './list-drivers.query.js';
import { DRIVER_SERVICE, type IDriverService } from '../../services/interfaces/driver.service.interface.js';
import type { DriverListResponseDTO } from '../../dtos/responses/driver/driver-response.dto.js';
@QueryHandler(ListDriversQuery)
export class ListDriversHandler implements IQueryHandler<ListDriversQuery, DriverListResponseDTO> {
  constructor(@Inject(DRIVER_SERVICE) private readonly service: IDriverService) {}
  async execute(q: ListDriversQuery): Promise<DriverListResponseDTO> { return this.service.list(q.options); }
}
