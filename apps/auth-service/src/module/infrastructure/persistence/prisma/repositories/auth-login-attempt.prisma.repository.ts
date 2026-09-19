import { Injectable } from '@nestjs/common';
import { AuthLoginAttempt as PrismaAuthLoginAttempt } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { AuthLoginAttemptEntity } from '../../../../domain/entities/auth-login-attempt.entity';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { LoginAttemptIpVO } from '../../../../domain/value-objects/primitives/login-attempt-ip.vo';
import { LoginAttemptStatusVO } from '../../../../domain/value-objects/primitives/login-attempt-status.vo';
import type { AuthLoginAttemptRepository } from '../../../../domain/repositories/auth-login-attempt.repository.interface';

@Injectable()
export class AuthLoginAttemptPrismaRepository
  extends BasePrismaRepository<AuthLoginAttemptEntity, string>
  implements AuthLoginAttemptRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaAuthLoginAttempt): AuthLoginAttemptEntity {
    return AuthLoginAttemptEntity.reconstitute(
      raw.id,
      {
        userId: raw.userId ? UserIdVO.create(raw.userId) : null,
        email: raw.email,
        ip: LoginAttemptIpVO.create(raw.ip),
        userAgent: raw.userAgent,
        status: LoginAttemptStatusVO.create(raw.status),
        attemptedAt: raw.attemptedAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<AuthLoginAttemptEntity | null> {
    const raw = await this.prisma.authLoginAttempt.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly AuthLoginAttemptEntity[]> {
    const rows = await this.prisma.authLoginAttempt.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: AuthLoginAttemptEntity): Promise<AuthLoginAttemptEntity> {
    const data = {
      userId: entity.userId?.value ?? null,
      email: entity.email,
      ip: entity.ip.value,
      userAgent: entity.userAgent,
      status: entity.status.value,
      attemptedAt: entity.attemptedAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.authLoginAttempt.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.authLoginAttempt.delete({ where: { id } });
  }

  async findByUser(userId: UserIdVO): Promise<readonly AuthLoginAttemptEntity[]> {
    const rows = await this.prisma.authLoginAttempt.findMany({
      where: { userId: userId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async countRecentByIp(ip: LoginAttemptIpVO, windowMs: number): Promise<number> {
    const since = new Date(Date.now() - windowMs);
    return this.prisma.authLoginAttempt.count({
      where: { ip: ip.value, attemptedAt: { gte: since } },
    });
  }

  async countRecentByEmail(email: string, windowMs: number): Promise<number> {
    const since = new Date(Date.now() - windowMs);
    return this.prisma.authLoginAttempt.count({
      where: { email, attemptedAt: { gte: since } },
    });
  }
}
