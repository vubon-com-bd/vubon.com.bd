import { Injectable } from '@nestjs/common';
import { TimeoutInterceptor } from './timeout.interceptor.js';

@Injectable()
export class ShippingMethodTimeoutInterceptor extends TimeoutInterceptor {
  constructor() { super(20_000); }
}
