import { Injectable } from '@nestjs/common';
import { RedisService as KernelRedisService } from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class RedisService extends KernelRedisService {}
