/**
 * WarehouseIndexer — index warehouses to search
 */
import { Injectable } from '@nestjs/common';
import { SearchService } from '../search.service.js';

@Injectable()
export class WarehouseIndexer {
  private readonly INDEX = 'warehouses';
  constructor(private readonly search: SearchService) {}

  async index(warehouse: {
    id: string; code: string; name: string; zone: string; status: string;
  }): Promise<boolean> {
    return this.search.index(this.INDEX, {
      id: warehouse.id,
      code: warehouse.code,
      name: warehouse.name,
      zone: warehouse.zone,
      status: warehouse.status,
    });
  }

  async remove(id: string): Promise<boolean> {
    return this.search.delete(this.INDEX, id);
  }
}
