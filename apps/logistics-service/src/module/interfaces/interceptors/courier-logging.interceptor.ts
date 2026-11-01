/**
 * CourierLoggingInterceptor — thin subclass
 */
import { Injectable } from '@nestjs/common';
import { LoggingInterceptor } from './logging.interceptor.js';

@Injectable()
export class CourierLoggingInterceptor extends LoggingInterceptor {}
