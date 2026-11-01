import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetDefaultPackagingQuery } from './get-default-packaging.query.js';
import { PACKAGING_SERVICE, type IPackagingService } from '@application/services/interfaces/packaging.service.interface';
import type { PackagingResponseDTO } from '@application/dtos/responses/packaging/index.js';

@QueryHandler(GetDefaultPackagingQuery)
export class GetDefaultPackagingHandler implements IQueryHandler<GetDefaultPackagingQuery, PackagingResponseDTO | null> {
  constructor(@Inject(PACKAGING_SERVICE) private readonly service: IPackagingService) {}
  async execute(): Promise<PackagingResponseDTO | null> { return this.service.getDefault(); }
}
