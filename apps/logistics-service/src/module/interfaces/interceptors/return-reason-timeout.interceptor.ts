import { Injectable } from '@nestjs/common';
import { TimeoutInterceptor } from './timeout.interceptor.js';

@Injectable()
export class ReturnReasonTimeoutInterceptor extends TimeoutInterceptor {
  constructor() { super(15_000); }
}
