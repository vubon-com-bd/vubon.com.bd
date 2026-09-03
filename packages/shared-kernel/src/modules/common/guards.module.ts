import { Module } from '@nestjs/common';
import { JwtAuthGuard } from '../../interfaces/guards';
import { RolesGuard } from '../../interfaces/guards';
import { PermissionsGuard } from '../../interfaces/guards';
import { OwnerGuard } from '../../interfaces/guards';
import { RateLimitGuard } from '../../interfaces/guards';

@Module({
  providers: [JwtAuthGuard, RolesGuard, PermissionsGuard, OwnerGuard, RateLimitGuard],
  exports: [JwtAuthGuard, RolesGuard, PermissionsGuard, OwnerGuard, RateLimitGuard],
})
export class GuardsModule {}
