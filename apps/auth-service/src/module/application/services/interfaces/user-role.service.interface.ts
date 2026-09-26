/**
 * UserRoleServiceInterface
 * @module auth-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserId } from '@vubon/shared-types/common';
import type { AuthRoleEntity } from '../../../domain/entities/auth-role.entity';
import type { UserRoleResponseDTO } from '../../dtos/responses/user-role-response.dto';

export interface UserRoleServiceInterface
  extends BaseServiceInterface<AuthRoleEntity, string> {
  listForUser(userId: UserId): Promise<readonly AuthRoleEntity[]>;

  assign(userId: UserId, roleName: string): Promise<void>;

  revoke(userId: UserId, roleName: string): Promise<void>;

  toResponse(role: AuthRoleEntity): UserRoleResponseDTO;
}
