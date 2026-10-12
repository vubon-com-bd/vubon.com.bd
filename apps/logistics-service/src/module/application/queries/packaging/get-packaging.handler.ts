import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetPackagingQuery } from './get-packaging.query.js';
import { PACKAGING_SERVICE, type IPackagingService } from '../../services/interfaces/packaging.service.interface.js';
import type { PackagingResponseDTO } from '../../dtos/responses/packaging/packaging-response.dto.js';
@QueryHandler(GetPackagingQuery)
export class GetPackagingHandler implements IQueryHandler<GetPackagingQuery, PackagingResponseDTO> {
  constructor(@Inject(PACKAGING_SERVICE) private readonly service: IPackagingService) {}
  async execute(q: GetPackagingQuery): Promise<PackagingResponseDTO> { return this.service.getById(q.packagingId); }
}
