import { Injectable } from '@nestjs/common';
import { AuthSession as PrismaAuthSession } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { AuthSessionEntity } from '../../../../domain/entities/auth-session.entity';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { SessionTokenVO } from '../../../../domain/value-objects/primitives/session-token.vo';
import { SessionExpiryVO } from '../../../../domain/value-objects/primitives/session-expiry.vo';
import type { AuthSessionRepository } from '../../../../domain/repositories/auth-session.repository.interface';

@Injectable()
export class AuthSessionPrismaRepository
  extends BasePrismaRepository<AuthSessionEntity, string>
  implements AuthSessionRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaAuthSession): AuthSessionEntity {
    return AuthSessionEntity.reconstitute(
      raw.id,
      {
        userId: UserIdVO.create(raw.userId),
        token: SessionTokenVO.create(raw.token),
        expiry: SessionExpiryVO.create(raw.expiry),
        ip: raw.ip,
        userAgent: raw.userAgent,
        deviceId: raw.deviceId,
        revokedAt: raw.revokedAt,
        revokeReason: raw.revokeReason,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: string): Promise<AuthSessionEntity | null> {
    const raw = await this.prisma.authSession.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly AuthSessionEntity[]> {
    const rows = await this.prisma.authSession.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: AuthSessionEntity): Promise<AuthSessionEntity> {
    const data = {
      userId: entity.userId.value,
      token: entity.token.value,
      expiry: new Date(entity.expiry.epochMs),
      ip: entity.ip,
      userAgent: entity.userAgent,
      deviceId: entity.deviceId,
      revokedAt: entity.revokedAt,
      revokeReason: entity.revokeReason,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.authSession.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.authSession.delete({ where: { id } });
  }

  async findByToken(token: SessionTokenVO): Promise<AuthSessionEntity | null> {
    const raw = await this.prisma.authSession.findUnique({
      where: { token: token.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findActiveByUser(userId: UserIdVO): Promise<readonly AuthSessionEntity[]> {
    const rows = await this.prisma.authSession.findMany({
      where: { userId: userId.value, revokedAt: null },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async revokeAllForUser(userId: UserIdVO): Promise<void> {
    await this.prisma.authSession.updateMany({
      where: { userId: userId.value, revokedAt: null },
      data: { revokedAt: new Date(), revokeReason: 'bulk_revoke' },
    });
  }
}
