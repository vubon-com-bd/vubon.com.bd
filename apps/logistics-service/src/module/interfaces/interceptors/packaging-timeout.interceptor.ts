import { Injectable } from '@nestjs/common';
import { TimeoutInterceptor } from './timeout.interceptor.js';

@Injectable()
export class PackagingTimeoutInterceptor extends TimeoutInterceptor {
  constructor() { super(20_000); }
}
