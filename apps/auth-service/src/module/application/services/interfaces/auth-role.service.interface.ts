import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { AuthRoleEntity } from '../../../domain/entities/auth-role.entity';
import type { UserRoleResponseDTO } from '../../dtos/responses/user-role-response.dto';

export interface AuthRoleServiceInterface
  extends BaseServiceInterface<AuthRoleEntity, string> {
  listAll(): Promise<UserRoleResponseDTO>;
  findByName(name: string): Promise<UserRoleResponseDTO | null>;
  assign(userId: string, roleName: string): Promise<void>;
  revoke(userId: string, roleName: string): Promise<void>;
}
