import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { AuthPermissionEntity } from '../../../domain/entities/auth-permission.entity';
import type { UserPermissionResponseDTO } from '../../dtos/responses/user-permission-response.dto';

export interface AuthPermissionServiceInterface
  extends BaseServiceInterface<AuthPermissionEntity, string> {
  listAll(): Promise<UserPermissionResponseDTO>;
  findByResource(resource: string): Promise<UserPermissionResponseDTO>;
}
