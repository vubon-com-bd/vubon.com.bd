import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetPackagingStatsQuery } from './get-packaging-stats.query.js';
import { PACKAGING_SERVICE, type IPackagingService } from '@application/services/interfaces/packaging.service.interface';
import type { PackagingStatsResponseDTO } from '@application/dtos/responses/packaging/index.js';

@QueryHandler(GetPackagingStatsQuery)
export class GetPackagingStatsHandler implements IQueryHandler<GetPackagingStatsQuery, PackagingStatsResponseDTO> {
  constructor(@Inject(PACKAGING_SERVICE) private readonly service: IPackagingService) {}
  async execute(): Promise<PackagingStatsResponseDTO> { return this.service.getStats(); }
}
