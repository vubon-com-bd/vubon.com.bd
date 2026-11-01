/**
 * ShipmentLoggingInterceptor — thin subclass
 * @module logistics-service/interfaces/interceptors
 */
import { Injectable } from '@nestjs/common';
import { LoggingInterceptor } from './logging.interceptor.js';

@Injectable()
export class ShipmentLoggingInterceptor extends LoggingInterceptor {}
