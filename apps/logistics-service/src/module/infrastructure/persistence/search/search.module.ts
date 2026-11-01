/**
 * SearchModule — wires search client, service, indexers, repos
 * @module logistics-service/infrastructure/persistence/search
 */
import { Module } from '@nestjs/common';
import { SearchClient } from './search.client.js';
import { SearchService } from './search.service.js';
import {
  ShipmentIndexer,
  TrackingIndexer,
  WarehouseIndexer,
} from './indexers/index.js';
import { ShipmentSearchRepository } from './repositories/index.js';

@Module({
  providers: [
    SearchClient,
    SearchService,
    ShipmentIndexer,
    TrackingIndexer,
    WarehouseIndexer,
    ShipmentSearchRepository,
  ],
  exports: [
    SearchClient,
    SearchService,
    ShipmentIndexer,
    TrackingIndexer,
    WarehouseIndexer,
    ShipmentSearchRepository,
  ],
})
export class SearchModule {}
