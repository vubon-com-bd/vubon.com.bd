import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { RoleNameVO } from '../../../../domain/value-objects/primitives/role-name.vo';
import type {
  UserRoleRelation,
  UserRoleRepository,
} from '../../../../domain/repositories/user-role.repository.interface';

@Injectable()
export class UserRolePrismaRepository implements UserRoleRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async findByUser(userId: UserIdVO): Promise<readonly UserRoleRelation[]> {
    const rows = await this.prisma.userRole.findMany({
      where: { userId: userId.value },
      include: { role: true },
    });
    return rows.map((r) => ({
      id: r.id,
      userId: r.userId,
      roleId: r.roleId,
      roleName: r.role.name,
    }));
  }

  async assign(userId: UserIdVO, roleName: RoleNameVO): Promise<void> {
    const role = await this.prisma.authRole.findUnique({
      where: { name: roleName.value },
    });
    if (!role) throw new Error(`Role not found: ${roleName.value}`);

    await this.prisma.userRole.upsert({
      where: { userId_roleId: { userId: userId.value, roleId: role.id } },
      create: { userId: userId.value, roleId: role.id },
      update: {},
    });
  }

  async revoke(userId: UserIdVO, roleName: RoleNameVO): Promise<void> {
    const role = await this.prisma.authRole.findUnique({
      where: { name: roleName.value },
    });
    if (!role) return;
    await this.prisma.userRole.deleteMany({
      where: { userId: userId.value, roleId: role.id },
    });
  }
}
