import { Injectable } from '@nestjs/common';
import type { UserPermissionServiceInterface } from '../interfaces/user-permission.service.interface.js';
import type { UserPermissionResponseDTO } from '../../dtos/responses/user-permission-response.dto.js';

@Injectable()
export class UserPermissionService implements UserPermissionServiceInterface {
  readonly name = 'UserPermissionService';
  async listForUser(_userId: string): Promise<readonly UserPermissionResponseDTO[]> { return []; }
  async grant(_userId: string, _permission: string, _grantedBy: string, _expiresAt?: string): Promise<void> {}
  async revoke(_userId: string, _permission: string, _revokedBy: string): Promise<void> {}
  async has(_userId: string, _permission: string): Promise<boolean> { return false; }
}
