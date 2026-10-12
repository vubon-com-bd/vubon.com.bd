/**
 * MapsModule
 * @module logistics-service/infrastructure/external/maps
 */
import { Global, Module } from '@nestjs/common';
import { GoogleMapsService, OpenStreetMapService } from './index.js';

@Global()
@Module({
  providers: [GoogleMapsService, OpenStreetMapService],
  exports: [GoogleMapsService, OpenStreetMapService],
})
export class MapsModule {}
