import { Module } from '@nestjs/common';
import { PermissionsGuard } from '../guards/permissions.guard';
import { RolesGuard } from '../guards/roles.guard';
import { RbacService } from '../../server/rbac/rbac.service';

/**
 * RBAC module — exposes RbacService for injection.
 * RolesGuard + PermissionsGuard are already global in AuthModule.
 */
@Module({
  providers: [RbacService, RolesGuard, PermissionsGuard],
  exports: [RbacService],
})
export class RbacModule {}
