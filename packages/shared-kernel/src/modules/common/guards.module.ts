/**
 * Guards Module — registers all shared guards as providers
 * @module shared-kernel/modules/common
 *
 * NOTE: Reflector is explicitly provided because @Global() modules in
 * NestJS v12 do not automatically resolve Reflector for guard instances.
 */
import { Global, Module } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  JwtAuthGuard,
  OwnerGuard,
  PermissionsGuard,
  PublicGuard,
  RateLimitGuard,
  RolesGuard,
} from '../../interfaces/guards/index.js';

@Global()
@Module({
  providers: [
    Reflector,
    JwtAuthGuard,
    RolesGuard,
    PermissionsGuard,
    OwnerGuard,
    RateLimitGuard,
    PublicGuard,
  ],
  exports: [
    Reflector,
    JwtAuthGuard,
    RolesGuard,
    PermissionsGuard,
    OwnerGuard,
    RateLimitGuard,
    PublicGuard,
  ],
})
export class KernelGuardsModule {}
