import { Injectable } from '@nestjs/common';
import { TimeoutInterceptor } from './timeout.interceptor.js';

@Injectable()
export class TrackingTimeoutInterceptor extends TimeoutInterceptor {
  constructor() { super(20_000); }
}
