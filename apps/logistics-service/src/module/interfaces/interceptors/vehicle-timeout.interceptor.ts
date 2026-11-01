import { Injectable } from '@nestjs/common';
import { TimeoutInterceptor } from './timeout.interceptor.js';

@Injectable()
export class VehicleTimeoutInterceptor extends TimeoutInterceptor {
  constructor() { super(20_000); }
}
