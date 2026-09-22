import { Injectable } from '@nestjs/common';
import { User as PrismaUser } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { UserEntity } from '../../../../domain/entities/user.entity';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '../../../../domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '../../../../domain/value-objects/primitives/user-name.vo';
import { UserPhoneVO } from '../../../../domain/value-objects/primitives/user-phone.vo';
import { UserStatusVO } from '../../../../domain/value-objects/primitives/user-status.vo';
import { UserTypeVO } from '../../../../domain/value-objects/primitives/user-type.vo';
import type { UserRepository } from '../../../../domain/repositories/user.repository.interface';

@Injectable()
export class UserPrismaRepository
  extends BasePrismaRepository<UserEntity, UserIdVO>
  implements UserRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaUser): UserEntity {
    return UserEntity.reconstitute(
      UserIdVO.create(raw.id),
      {
        email: UserEmailVO.create(raw.email),
        name: UserNameVO.create(raw.name),
        phone: raw.phone ? UserPhoneVO.create(raw.phone) : null,
        status: UserStatusVO.create(raw.status),
        type: UserTypeVO.create(raw.type),
        emailVerified: raw.emailVerified,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: UserIdVO): Promise<UserEntity | null> {
    const raw = await this.prisma.user.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly UserEntity[]> {
    const rows = await this.prisma.user.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: UserEntity): Promise<UserEntity> {
    const data = {
      email: entity.email.value,
      name: entity.name.value,
      phone: entity.phone?.value ?? null,
      status: entity.status.value,
      type: entity.type.value,
      emailVerified: entity.emailVerified,
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.user.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: UserIdVO): Promise<void> {
    await this.prisma.user.delete({ where: { id: id.value } });
  }

  async findByEmail(email: UserEmailVO): Promise<UserEntity | null> {
    const raw = await this.prisma.user.findUnique({
      where: { email: email.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async existsByEmail(email: UserEmailVO): Promise<boolean> {
    const count = await this.prisma.user.count({
      where: { email: email.value },
    });
    return count > 0;
  }

  async findByStatus(status: string): Promise<readonly UserEntity[]> {
    const rows = await this.prisma.user.findMany({ where: { status } });
    return rows.map((r) => this.toDomain(r));
  }
}
