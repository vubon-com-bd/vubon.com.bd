import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListAvailableDriversQuery } from './list-available-drivers.query.js';
import { DRIVER_SERVICE, type IDriverService } from '@application/services/interfaces/driver.service.interface';
import type { DriverListResponseDTO } from '@application/dtos/responses/driver/index.js';

@QueryHandler(ListAvailableDriversQuery)
export class ListAvailableDriversHandler implements IQueryHandler<ListAvailableDriversQuery, DriverListResponseDTO> {
  constructor(@Inject(DRIVER_SERVICE) private readonly service: IDriverService) {}
  async execute(): Promise<DriverListResponseDTO> { return this.service.listAvailable(); }
}
