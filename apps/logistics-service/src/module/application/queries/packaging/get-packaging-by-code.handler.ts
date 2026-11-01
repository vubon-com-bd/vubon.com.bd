import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetPackagingByCodeQuery } from './get-packaging-by-code.query.js';
import { PACKAGING_SERVICE, type IPackagingService } from '@application/services/interfaces/packaging.service.interface';
import type { PackagingResponseDTO } from '@application/dtos/responses/packaging/index.js';

@QueryHandler(GetPackagingByCodeQuery)
export class GetPackagingByCodeHandler implements IQueryHandler<GetPackagingByCodeQuery, PackagingResponseDTO> {
  constructor(@Inject(PACKAGING_SERVICE) private readonly service: IPackagingService) {}
  async execute(q: GetPackagingByCodeQuery): Promise<PackagingResponseDTO> { return this.service.getByCode(q.code); }
}
