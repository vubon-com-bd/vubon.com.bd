import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetDriverQuery } from './get-driver.query.js';
import { DRIVER_SERVICE, type IDriverService } from '../../services/interfaces/driver.service.interface.js';
import type { DriverResponseDTO } from '../../dtos/responses/driver/driver-response.dto.js';
@QueryHandler(GetDriverQuery)
export class GetDriverHandler implements IQueryHandler<GetDriverQuery, DriverResponseDTO> {
  constructor(@Inject(DRIVER_SERVICE) private readonly service: IDriverService) {}
  async execute(q: GetDriverQuery): Promise<DriverResponseDTO> { return this.service.getById(q.driverId); }
}
