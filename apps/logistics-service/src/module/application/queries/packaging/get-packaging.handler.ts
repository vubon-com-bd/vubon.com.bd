import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetPackagingQuery } from './get-packaging.query.js';
import { PACKAGING_SERVICE, type IPackagingService } from '@application/services/interfaces/packaging.service.interface';
import type { PackagingResponseDTO } from '@application/dtos/responses/packaging/index.js';

@QueryHandler(GetPackagingQuery)
export class GetPackagingHandler implements IQueryHandler<GetPackagingQuery, PackagingResponseDTO> {
  constructor(@Inject(PACKAGING_SERVICE) private readonly service: IPackagingService) {}
  async execute(q: GetPackagingQuery): Promise<PackagingResponseDTO> { return this.service.getById(q.packagingId); }
}
