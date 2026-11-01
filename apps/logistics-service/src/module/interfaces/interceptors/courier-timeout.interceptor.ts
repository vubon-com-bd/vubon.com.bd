/**
 * CourierTimeoutInterceptor — 20s timeout
 */
import { Injectable } from '@nestjs/common';
import { TimeoutInterceptor } from './timeout.interceptor.js';

@Injectable()
export class CourierTimeoutInterceptor extends TimeoutInterceptor {
  constructor() {
    super(20_000);
  }
}
