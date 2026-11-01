import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetDriverByLicenseQuery } from './get-driver-by-license.query.js';
import { DRIVER_SERVICE, type IDriverService } from '@application/services/interfaces/driver.service.interface';
import type { DriverResponseDTO } from '@application/dtos/responses/driver/index.js';

@QueryHandler(GetDriverByLicenseQuery)
export class GetDriverByLicenseHandler implements IQueryHandler<GetDriverByLicenseQuery, DriverResponseDTO> {
  constructor(@Inject(DRIVER_SERVICE) private readonly service: IDriverService) {}
  async execute(q: GetDriverByLicenseQuery): Promise<DriverResponseDTO> { return this.service.getByLicense(q.licenseNumber); }
}
