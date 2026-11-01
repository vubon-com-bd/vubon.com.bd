import { Injectable } from '@nestjs/common';
import { TimeoutInterceptor } from './timeout.interceptor.js';

@Injectable()
export class DriverTimeoutInterceptor extends TimeoutInterceptor {
  constructor() { super(20_000); }
}
