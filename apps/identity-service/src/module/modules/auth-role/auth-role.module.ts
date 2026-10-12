/**
 * AuthRoleModule — roles + permissions
 * @module identity-service/modules/auth-role
 *
 * Provides:
 *  - AuthRoleService + AUTH_ROLE_SERVICE
 *  - AuthPermissionService + AUTH_PERMISSION_SERVICE
 *  - UserRoleService + USER_ROLE_SERVICE (used by AssignRole/RevokeRole handlers)
 *  - UserPermissionService + USER_PERMISSION_SERVICE (used by AssignPermission/RevokePermission handlers)
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthRoleController } from '../../interfaces/controllers/rest/auth-role.controller.js';
import { AuthPermissionController } from '../../interfaces/controllers/rest/auth-permission.controller.js';
import { ROLE_COMMAND_HANDLERS } from './commands/index.js';
import { ROLE_QUERY_HANDLERS } from './queries/index.js';

// Auth role + permission services
import { AuthRoleService } from '../../application/services/impl/auth-role.service.js';
import { AuthPermissionService } from '../../application/services/impl/auth-permission.service.js';
import { AUTH_ROLE_SERVICE } from '../../application/services/interfaces/auth-role.service.interface.js';
import { AUTH_PERMISSION_SERVICE } from '../../application/services/interfaces/auth-permission.service.interface.js';

// User role + permission services (used by AssignRole/AssignPermission handlers)
import { UserRoleService } from '../../application/services/impl/user-role.service.js';
import { UserPermissionService } from '../../application/services/impl/user-permission.service.js';
import { USER_ROLE_SERVICE } from '../../application/services/interfaces/user-role.service.interface.js';
import { USER_PERMISSION_SERVICE } from '../../application/services/interfaces/user-permission.service.interface.js';

const SERVICES = [
  // Auth
  AuthRoleService,
  { provide: AUTH_ROLE_SERVICE, useExisting: AuthRoleService },
  AuthPermissionService,
  { provide: AUTH_PERMISSION_SERVICE, useExisting: AuthPermissionService },

  // User (handlers depend on these)
  UserRoleService,
  { provide: USER_ROLE_SERVICE, useExisting: UserRoleService },
  UserPermissionService,
  { provide: USER_PERMISSION_SERVICE, useExisting: UserPermissionService },
];

@Module({
  imports: [CqrsModule],
  controllers: [AuthRoleController, AuthPermissionController],
  providers: [
    ...SERVICES,
    ...(ROLE_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(ROLE_QUERY_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: SERVICES,
})
export class AuthRoleModule {}
