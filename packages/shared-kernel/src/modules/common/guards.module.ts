/**
 * Guards Module — registers all shared guards as providers
 * @module shared-kernel/modules/common
 */
import { Global, Module } from '@nestjs/common';
import {
  JwtAuthGuard,
  OwnerGuard,
  PermissionsGuard,
  PublicGuard,
  RateLimitGuard,
  RolesGuard,
} from '../../interfaces/guards';

@Global()
@Module({
  providers: [JwtAuthGuard, RolesGuard, PermissionsGuard, OwnerGuard, RateLimitGuard, PublicGuard],
  exports: [JwtAuthGuard, RolesGuard, PermissionsGuard, OwnerGuard, RateLimitGuard, PublicGuard],
})
export class KernelGuardsModule {}
