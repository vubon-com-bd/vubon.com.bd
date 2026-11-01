import { Injectable } from '@nestjs/common';
import { TimeoutInterceptor } from './timeout.interceptor.js';

@Injectable()
export class InsuranceTimeoutInterceptor extends TimeoutInterceptor {
  constructor() { super(25_000); }
}
