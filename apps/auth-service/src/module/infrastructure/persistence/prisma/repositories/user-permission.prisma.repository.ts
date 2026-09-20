import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { PermissionNameVO } from '../../../../domain/value-objects/primitives/permission-name.vo';
import type {
  UserPermissionRelation,
  UserPermissionRepository,
} from '../../../../domain/repositories/user-permission.repository.interface';

@Injectable()
export class UserPermissionPrismaRepository implements UserPermissionRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async findByUser(userId: UserIdVO): Promise<readonly UserPermissionRelation[]> {
    const rows = await this.prisma.userPermission.findMany({
      where: { userId: userId.value },
      include: { permission: true },
    });
    return rows.map((r) => ({
      id: r.id,
      userId: r.userId,
      permissionId: r.permissionId,
      permissionName: r.permission.name,
    }));
  }

  async assign(userId: UserIdVO, permissionName: PermissionNameVO): Promise<void> {
    const perm = await this.prisma.authPermission.findUnique({
      where: { name: permissionName.value },
    });
    if (!perm) throw new Error(`Permission not found: ${permissionName.value}`);

    await this.prisma.userPermission.upsert({
      where: { userId_permissionId: { userId: userId.value, permissionId: perm.id } },
      create: { userId: userId.value, permissionId: perm.id },
      update: {},
    });
  }

  async revoke(userId: UserIdVO, permissionName: PermissionNameVO): Promise<void> {
    const perm = await this.prisma.authPermission.findUnique({
      where: { name: permissionName.value },
    });
    if (!perm) return;
    await this.prisma.userPermission.deleteMany({
      where: { userId: userId.value, permissionId: perm.id },
    });
  }
}
