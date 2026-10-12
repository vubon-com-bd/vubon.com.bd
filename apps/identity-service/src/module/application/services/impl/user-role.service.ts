import { Injectable } from '@nestjs/common';
import type { UserRoleServiceInterface } from '../interfaces/user-role.service.interface.js';
import type { UserRoleResponseDTO } from '../../dtos/responses/user-role-response.dto.js';

@Injectable()
export class UserRoleService implements UserRoleServiceInterface {
  readonly name = 'UserRoleService';
  async listForUser(_userId: string): Promise<readonly UserRoleResponseDTO[]> { return []; }
  async assign(_userId: string, _role: string, _assignedBy: string, _expiresAt?: string): Promise<void> {}
  async revoke(_userId: string, _role: string, _revokedBy: string): Promise<void> {}
  async has(_userId: string, _role: string): Promise<boolean> { return false; }
}
