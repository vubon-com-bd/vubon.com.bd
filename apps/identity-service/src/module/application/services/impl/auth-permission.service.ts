import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { AuthPermissionServiceInterface } from '../interfaces/auth-permission.service.interface.js';
import type { PermissionRepository } from '../../../domain/repositories/permission.repository.interface.js';
import { PERMISSION_REPOSITORY } from '../../../domain/repositories/permission.repository.interface.js';
import type { PermissionEntity } from '../../../domain/entities/permission.entity.js';
import type { UserPermissionResponseDTO } from '../../dtos/responses/user-permission-response.dto.js';

@Injectable()
export class AuthPermissionService extends BaseService implements AuthPermissionServiceInterface {
  readonly name = 'AuthPermissionService';
  constructor(@Inject(PERMISSION_REPOSITORY) private readonly repo: PermissionRepository) { super(); }
  async listAll(): Promise<readonly PermissionEntity[]> { return this.repo.findAll(); }
  async findByCategory(c: string): Promise<readonly PermissionEntity[]> { return this.repo.findByCategory(c); }
  async listForUser(_userId: string): Promise<readonly UserPermissionResponseDTO[]> { return []; }
  async hasPermission(_userId: string, _permission: string): Promise<boolean> { return false; }
}
