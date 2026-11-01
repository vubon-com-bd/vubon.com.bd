import { Injectable } from '@nestjs/common';
import { TimeoutInterceptor } from './timeout.interceptor.js';

@Injectable()
export class ReturnShipmentTimeoutInterceptor extends TimeoutInterceptor {
  constructor() { super(25_000); }
}
