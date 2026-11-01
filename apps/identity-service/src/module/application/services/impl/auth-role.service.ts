import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { AuthRoleServiceInterface } from '../interfaces/auth-role.service.interface.js';
import type { RoleRepository } from '../../../domain/repositories/role.repository.interface.js';
import { ROLE_REPOSITORY } from '../../../domain/repositories/role.repository.interface.js';
import type { RoleEntity } from '../../../domain/entities/role.entity.js';
import type { UserRoleResponseDTO } from '../../dtos/responses/user-role-response.dto.js';

@Injectable()
export class AuthRoleService extends BaseService implements AuthRoleServiceInterface {
  readonly name = 'AuthRoleService';
  constructor(@Inject(ROLE_REPOSITORY) private readonly repo: RoleRepository) { super(); }
  async listAll(): Promise<readonly RoleEntity[]> { return this.repo.findAll(); }
  async findByName(name: string): Promise<RoleEntity | null> { return this.repo.findByName(name); }
  async listForUser(_userId: string): Promise<readonly UserRoleResponseDTO[]> { return []; }
  async assign(_userId: string, _role: string, _assignedBy: string): Promise<void> {}
  async revoke(_userId: string, _role: string, _revokedBy: string): Promise<void> {}
  async hasRole(_userId: string, _role: string): Promise<boolean> { return false; }
}
