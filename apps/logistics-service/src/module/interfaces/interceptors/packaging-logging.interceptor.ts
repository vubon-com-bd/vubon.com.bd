import { Injectable } from '@nestjs/common';
import { LoggingInterceptor } from './logging.interceptor.js';

@Injectable()
export class PackagingLoggingInterceptor extends LoggingInterceptor {}
