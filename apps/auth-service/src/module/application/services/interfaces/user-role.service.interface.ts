import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { AuthRoleEntity } from '../../../domain/entities/auth-role.entity';
import type { UserRoleResponseDTO } from '../../dtos/responses/user-role-response.dto';

export interface UserRoleServiceInterface
  extends BaseServiceInterface<AuthRoleEntity, string> {
  listForUser(userId: string): Promise<UserRoleResponseDTO>;
  assign(userId: string, role: string): Promise<void>;
  revoke(userId: string, role: string): Promise<void>;
}
