/**
 * ShipmentSearchRepository — read-side search
 * @module logistics-service/infrastructure/persistence/search/repositories
 */
import { Injectable } from '@nestjs/common';
import { SearchService } from '../search.service.js';

export interface ShipmentSearchDoc {
  readonly id: string;
  readonly trackingNumber: string;
  readonly shipmentNumber: string;
  readonly status: string;
  readonly [key: string]: unknown;
}

@Injectable()
export class ShipmentSearchRepository {
  constructor(private readonly search: SearchService) {}

  async findByQuery(query: string, page = 1, limit = 20): Promise<{
    ids: readonly string[];
    total: number;
  } | null> {
    const res = await this.search.search<ShipmentSearchDoc>('shipments', { q: query, page, limit });
    if (!res) return null;
    return { ids: res.hits.map((h) => h.document.id), total: res.total };
  }
}
