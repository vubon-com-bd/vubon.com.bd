/**
 * CouriersModule — aggregates all 10 courier provider modules
 * @module logistics-service/infrastructure/external/couriers
 */
import { Module } from '@nestjs/common';
import { SaParibahanModule } from './sa-paribahan/index.js';
import { SundarbanModule } from './sundarban/index.js';
import { RedxModule } from './redx/index.js';
import { PathaoModule } from './pathao/index.js';
import { PaperflyModule } from './paperfly/index.js';
import { SteadfastModule } from './steadfast/index.js';
import { DhlModule } from './dhl/index.js';
import { FedexModule } from './fedex/index.js';
import { UpsModule } from './ups/index.js';
import { AramexModule } from './aramex/index.js';

@Module({
  imports: [
    SaParibahanModule,
    SundarbanModule,
    RedxModule,
    PathaoModule,
    PaperflyModule,
    SteadfastModule,
    DhlModule,
    FedexModule,
    UpsModule,
    AramexModule,
  ],
  exports: [
    SaParibahanModule,
    SundarbanModule,
    RedxModule,
    PathaoModule,
    PaperflyModule,
    SteadfastModule,
    DhlModule,
    FedexModule,
    UpsModule,
    AramexModule,
  ],
})
export class CouriersModule {}
