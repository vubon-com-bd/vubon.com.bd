import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListPackagingsQuery } from './list-packagings.query.js';
import { PACKAGING_SERVICE, type IPackagingService } from '@application/services/interfaces/packaging.service.interface';
import type { PackagingListResponseDTO } from '@application/dtos/responses/packaging/index.js';

@QueryHandler(ListPackagingsQuery)
export class ListPackagingsHandler implements IQueryHandler<ListPackagingsQuery, PackagingListResponseDTO> {
  constructor(@Inject(PACKAGING_SERVICE) private readonly service: IPackagingService) {}
  async execute(q: ListPackagingsQuery): Promise<PackagingListResponseDTO> { return this.service.list(q.options); }
}
