import { Injectable } from '@nestjs/common';
import { TimeoutInterceptor } from './timeout.interceptor.js';

@Injectable()
export class RouteTimeoutInterceptor extends TimeoutInterceptor {
  constructor() { super(25_000); }
}
