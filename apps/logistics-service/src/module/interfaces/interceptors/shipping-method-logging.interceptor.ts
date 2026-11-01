import { Injectable } from '@nestjs/common';
import { LoggingInterceptor } from './logging.interceptor.js';

@Injectable()
export class ShippingMethodLoggingInterceptor extends LoggingInterceptor {}
