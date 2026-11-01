/**
 * JwtAuthGuard — thin wrapper over kernel JwtAuthGuard
 * @module identity-service/interfaces/guards
 */
import { Injectable } from '@nestjs/common';
import { JwtAuthGuard as KernelJwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';

@Injectable()
export class JwtAuthGuard extends KernelJwtAuthGuard {}
