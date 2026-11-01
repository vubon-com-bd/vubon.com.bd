import { Injectable } from '@nestjs/common';
import { TimeoutInterceptor } from './timeout.interceptor.js';

@Injectable()
export class DeliveryTimeoutInterceptor extends TimeoutInterceptor {
  constructor() { super(25_000); }
}
