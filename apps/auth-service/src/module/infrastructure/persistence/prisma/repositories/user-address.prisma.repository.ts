/**
 * UserAddressPrismaRepository
 * @module auth-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import type { UserAddress as PrismaUserAddress } from '@prisma/client';
import {
  BasePrismaRepository,
  type PrismaDelegate,
} from '@vubon/shared-kernel/infrastructure/persistence/prisma/repositories/base.prisma.repository';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma/prisma.service';
import type { UserId } from '@vubon/shared-types/common';
import { UserAddressEntity } from '../../../../domain/entities/user-address.entity';
import type { UserAddressRepository } from '../../../../domain/repositories/user-address.repository.interface';

@Injectable()
export class UserAddressPrismaRepository
  extends BasePrismaRepository<UserAddressEntity, PrismaUserAddress, string>
  implements UserAddressRepository {
  protected readonly model: PrismaDelegate<PrismaUserAddress>;

  constructor(protected readonly prisma: PrismaService) {
    super();
    this.model = prisma.userAddress as unknown as PrismaDelegate<PrismaUserAddress>;
  }

  protected idOf(domain: UserAddressEntity): string {
    return domain.id;
  }

  protected whereForId(id: string): Record<string, unknown> {
    return { id };
  }

  protected toDomain(raw: PrismaUserAddress): UserAddressEntity {
    return UserAddressEntity.create({
      id: raw.id,
      userId: raw.userId as UserId,
      label: raw.label,
      line1: raw.addressLine,
      line2: undefined,
      division: raw.division,
      district: raw.district,
      upazila: raw.upazila,
      postalCode: raw.postalCode ?? '0000',
      isDefault: raw.isDefault,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: raw.deletedAt ? raw.deletedAt.toISOString() : null,
    });
  }

  protected toPersistence(domain: UserAddressEntity): Record<string, unknown> {
    return {
      id: domain.id,
      userId: domain.userId,
      label: domain.label,
      fullName: 'User',
      phone: '0000000000',
      division: 'Dhaka',
      district: 'Dhaka',
      upazila: 'Dhaka',
      addressLine: (domain as unknown as { line1?: string }).line1 ?? '',
      postalCode: domain.postalCode,
      isDefault: domain.isDefault,
      updatedAt: new Date(),
    };
  }

  async findByUserId(userId: UserId): Promise<readonly UserAddressEntity[]> {
    const rows = await this.prisma.userAddress.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findDefaultByUserId(userId: UserId): Promise<UserAddressEntity | null> {
    const raw = await this.prisma.userAddress.findFirst({
      where: { userId, isDefault: true },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async clearDefaultForUser(userId: UserId): Promise<void> {
    await this.prisma.userAddress.updateMany({
      where: { userId, isDefault: true },
      data: { isDefault: false, updatedAt: new Date() },
    });
  }
}
