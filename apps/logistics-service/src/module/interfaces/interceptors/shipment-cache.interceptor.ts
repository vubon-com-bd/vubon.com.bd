/**
 * ShipmentCacheInterceptor — thin subclass
 * @module logistics-service/interfaces/interceptors
 */
import { Injectable } from '@nestjs/common';
import { CacheInterceptor } from './cache.interceptor.js';

@Injectable()
export class ShipmentCacheInterceptor extends CacheInterceptor {}
