/**
 * CouriersModule — wires all courier adapters
 * @module logistics-service/infrastructure/external/couriers
 */
import { Global, Module } from '@nestjs/common';
import {
  PathaoCourierAdapter, RedxCourierAdapter, SteadfastCourierAdapter, SaParibahanCourierAdapter,
} from './index.js';

const COURIERS = [
  PathaoCourierAdapter, RedxCourierAdapter, SteadfastCourierAdapter, SaParibahanCourierAdapter,
] as const;

@Global()
@Module({
  providers: [...COURIERS],
  exports: [...COURIERS],
})
export class CouriersModule {}
