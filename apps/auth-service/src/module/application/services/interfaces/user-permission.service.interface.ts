import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { AuthPermissionEntity } from '../../../domain/entities/auth-permission.entity';
import type { UserPermissionResponseDTO } from '../../dtos/responses/user-permission-response.dto';

export interface UserPermissionServiceInterface
  extends BaseServiceInterface<AuthPermissionEntity, string> {
  listForUser(userId: string): Promise<UserPermissionResponseDTO>;
  assign(userId: string, permission: string): Promise<void>;
  revoke(userId: string, permission: string): Promise<void>;
}
