import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetDriverByPhoneQuery } from './get-driver-by-phone.query.js';
import { DRIVER_SERVICE, type IDriverService } from '@application/services/interfaces/driver.service.interface';
import type { DriverResponseDTO } from '@application/dtos/responses/driver/index.js';

@QueryHandler(GetDriverByPhoneQuery)
export class GetDriverByPhoneHandler implements IQueryHandler<GetDriverByPhoneQuery, DriverResponseDTO> {
  constructor(@Inject(DRIVER_SERVICE) private readonly service: IDriverService) {}
  async execute(q: GetDriverByPhoneQuery): Promise<DriverResponseDTO> { return this.service.getByPhone(q.phone); }
}
