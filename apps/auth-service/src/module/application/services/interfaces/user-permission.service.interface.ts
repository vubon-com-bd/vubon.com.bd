/**
 * UserPermissionServiceInterface
 * @module auth-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserId } from '@vubon/shared-types/common';
import type { AuthPermissionEntity } from '../../../domain/entities/auth-permission.entity';
import type { UserPermissionResponseDTO } from '../../dtos/responses/user-permission-response.dto';

export interface UserPermissionServiceInterface
  extends BaseServiceInterface<AuthPermissionEntity, string> {
  listForUser(userId: UserId): Promise<readonly AuthPermissionEntity[]>;

  effectivePermissions(userId: UserId): Promise<UserPermissionResponseDTO>;

  hasPermission(userId: UserId, permission: string): Promise<boolean>;
}
