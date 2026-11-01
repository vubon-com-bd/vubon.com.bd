import { Module } from '@nestjs/common';
import { GoogleMapsService } from './google-maps.service.js';
import { OpenStreetMapService } from './openstreetmap.service.js';

@Module({
  providers: [GoogleMapsService, OpenStreetMapService],
  exports: [GoogleMapsService, OpenStreetMapService],
})
export class MapsModule {}
