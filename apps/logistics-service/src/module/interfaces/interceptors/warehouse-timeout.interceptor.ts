import { Injectable } from '@nestjs/common';
import { TimeoutInterceptor } from './timeout.interceptor.js';

@Injectable()
export class WarehouseTimeoutInterceptor extends TimeoutInterceptor {
  constructor() { super(20_000); }
}
