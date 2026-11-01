import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListOutOfStockPackagingsQuery } from './list-out-of-stock-packagings.query.js';
import { PACKAGING_SERVICE, type IPackagingService } from '@application/services/interfaces/packaging.service.interface';
import type { PackagingListResponseDTO } from '@application/dtos/responses/packaging/index.js';

@QueryHandler(ListOutOfStockPackagingsQuery)
export class ListOutOfStockPackagingsHandler implements IQueryHandler<ListOutOfStockPackagingsQuery, PackagingListResponseDTO> {
  constructor(@Inject(PACKAGING_SERVICE) private readonly service: IPackagingService) {}
  async execute(): Promise<PackagingListResponseDTO> { return this.service.listOutOfStock(); }
}
