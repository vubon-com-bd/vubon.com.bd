import { Injectable } from '@nestjs/common';
import { AuthToken as PrismaAuthToken } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { AuthTokenEntity } from '../../../../domain/entities/auth-token.entity';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { TokenValueVO } from '../../../../domain/value-objects/primitives/token-value.vo';
import { TokenTypeVO } from '../../../../domain/value-objects/primitives/token-type.vo';
import { TokenExpiryVO } from '../../../../domain/value-objects/primitives/token-expiry.vo';
import type { AuthTokenRepository } from '../../../../domain/repositories/auth-token.repository.interface';

@Injectable()
export class AuthTokenPrismaRepository
  extends BasePrismaRepository<AuthTokenEntity, string>
  implements AuthTokenRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaAuthToken): AuthTokenEntity {
    return AuthTokenEntity.reconstitute(
      raw.id,
      {
        userId: UserIdVO.create(raw.userId),
        tokenValue: TokenValueVO.create(raw.tokenValue),
        tokenType: TokenTypeVO.create(raw.tokenType),
        expiry: TokenExpiryVO.create(raw.expiry),
        issuedAt: raw.issuedAt,
        revokedAt: raw.revokedAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: string): Promise<AuthTokenEntity | null> {
    const raw = await this.prisma.authToken.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly AuthTokenEntity[]> {
    const rows = await this.prisma.authToken.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: AuthTokenEntity): Promise<AuthTokenEntity> {
    const data = {
      userId: entity.userId.value,
      tokenValue: entity.tokenValue.value,
      tokenType: entity.tokenType.value,
      expiry: new Date(entity.expiry.epochMs),
      issuedAt: entity.issuedAt,
      revokedAt: entity.revokedAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.authToken.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.authToken.delete({ where: { id } });
  }

  async findByValue(value: TokenValueVO): Promise<AuthTokenEntity | null> {
    const raw = await this.prisma.authToken.findUnique({
      where: { tokenValue: value.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async revokeAllForUser(userId: UserIdVO): Promise<void> {
    await this.prisma.authToken.updateMany({
      where: { userId: userId.value, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }
}
