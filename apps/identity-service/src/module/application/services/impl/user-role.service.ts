import { Injectable, Inject } from '@nestjs/common';
import type { UserRoleServiceInterface } from '../interfaces/user-role.service.interface.js';
import type { UserRoleResponseDTO } from '../../dtos/responses/user-role-response.dto.js';
import { USER_REPOSITORY, type UserRepository } from '../../../domain/repositories/user.repository.interface.js';
import { UserRoleVO } from '../../../domain/value-objects/primitives/user-role.vo.js';

@Injectable()
export class UserRoleService implements UserRoleServiceInterface {
  readonly name = 'UserRoleService';

  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
  ) {}

  async listForUser(userId: string): Promise<readonly UserRoleResponseDTO[]> {
    const user = await this.userRepo.findById(userId);
    if (!user) return [];
    const roles = (user as unknown as { roles?: readonly { value: string }[] }).roles ?? [];
    return roles.map((r) => ({ userId, role: r.value, assignedAt: user.createdAt }) as unknown as UserRoleResponseDTO);
  }

  async assign(userId: string, role: string, assignedBy: string, expiresAt?: string): Promise<void> {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new Error(`User ${userId} not found`);

    const roleVo = UserRoleVO.create(role);
    user.assignRole(roleVo, assignedBy);
    await this.userRepo.save(user);
  }

  async revoke(userId: string, role: string, revokedBy: string): Promise<void> {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new Error(`User ${userId} not found`);
    const roleVo = UserRoleVO.create(role);
    (user as unknown as { revokeRole: (r: UserRoleVO, by: string) => void }).revokeRole(roleVo, revokedBy);
    await this.userRepo.save(user);
  }

  async has(userId: string, role: string): Promise<boolean> {
    const user = await this.userRepo.findById(userId);
    if (!user) return false;
    const roles = (user as unknown as { roles?: readonly { value: string }[] }).roles ?? [];
    return roles.some((r) => r.value === role);
  }
}
