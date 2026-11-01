import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListUsablePackagingsQuery } from './list-usable-packagings.query.js';
import { PACKAGING_SERVICE, type IPackagingService } from '@application/services/interfaces/packaging.service.interface';
import type { PackagingListResponseDTO } from '@application/dtos/responses/packaging/index.js';

@QueryHandler(ListUsablePackagingsQuery)
export class ListUsablePackagingsHandler implements IQueryHandler<ListUsablePackagingsQuery, PackagingListResponseDTO> {
  constructor(@Inject(PACKAGING_SERVICE) private readonly service: IPackagingService) {}
  async execute(): Promise<PackagingListResponseDTO> { return this.service.listUsable(); }
}
