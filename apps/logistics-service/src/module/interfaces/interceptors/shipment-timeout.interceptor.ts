/**
 * ShipmentTimeoutInterceptor — thin subclass (25s timeout)
 * @module logistics-service/interfaces/interceptors
 */
import { Injectable } from '@nestjs/common';
import { TimeoutInterceptor } from './timeout.interceptor.js';

@Injectable()
export class ShipmentTimeoutInterceptor extends TimeoutInterceptor {
  constructor() {
    super(25_000);
  }
}
