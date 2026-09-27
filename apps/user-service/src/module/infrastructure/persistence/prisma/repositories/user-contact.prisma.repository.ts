/**
 * UserContactPrismaRepository
 */
import { Injectable } from '@nestjs/common';
import type { UserContact as PrismaUserContact } from '@prisma/client';
import { PrismaService } from '../prisma.service.js';
import type { UserContactRepository } from '@domain/repositories/user-contact.repository.interface';
import { UserContactEntity } from '@domain/entities/user-contact.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { ContactIdVO } from '@domain/value-objects/primitives/contact-id.vo';
import { ContactTypeVO } from '@domain/value-objects/primitives/contact-type.vo';
import { ContactValueVO } from '@domain/value-objects/primitives/contact-value.vo';

@Injectable()
export class UserContactPrismaRepository implements UserContactRepository {
  constructor(private readonly prisma: PrismaService) {}

  private toDomain(raw: PrismaUserContact): UserContactEntity {
    return UserContactEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: null,
      props: {
        contactId: ContactIdVO.create(raw.id),
        userId: UserIdVO.create(raw.userId),
        type: ContactTypeVO.create(raw.type ?? 'email'),
        contactValue: ContactValueVO.create(raw.value ?? ''),
        isPrimary: false,
        isVerified: raw.verified,
      },
    });
  }

  async findById(id: string): Promise<UserContactEntity | null> {
    const raw = await this.prisma.userContact.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly UserContactEntity[]> {
    const raws = await this.prisma.userContact.findMany();
    return raws.map((r) => this.toDomain(r));
  }

  async save(entity: UserContactEntity): Promise<UserContactEntity> {
    const raw = await this.prisma.userContact.upsert({
      where: { id: entity.id },
      create: {
        id: entity.id,
        userId: entity.userId.value,
        type: entity.type.value,
        value: entity.contactValue.value,
        verified: entity.isVerified,
      },
      update: {
        type: entity.type.value,
        value: entity.contactValue.value,
        verified: entity.isVerified,
        updatedAt: new Date(),
      },
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.userContact.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.userContact.count({ where: { id } });
    return count > 0;
  }

  async findByUserId(userId: UserIdVO): Promise<readonly UserContactEntity[]> {
    const raws = await this.prisma.userContact.findMany({
      where: { userId: userId.value },
      orderBy: { createdAt: 'asc' },
    });
    return raws.map((r) => this.toDomain(r));
  }

  async findByType(
    userId: UserIdVO,
    type: ContactTypeVO
  ): Promise<readonly UserContactEntity[]> {
    const raws = await this.prisma.userContact.findMany({
      where: { userId: userId.value, type: type.value },
    });
    return raws.map((r) => this.toDomain(r));
  }

  async findPrimaryByUserId(userId: UserIdVO): Promise<UserContactEntity | null> {
    const raws = await this.findByUserId(userId);
    return raws.find((c) => c.isPrimary) ?? null;
  }

  async countByUserId(userId: UserIdVO): Promise<number> {
    return this.prisma.userContact.count({ where: { userId: userId.value } });
  }

  async clearPrimaryForUser(_userId: UserIdVO): Promise<void> {
    // No 'isPrimary' column in schema — no-op for now
    void _userId;
  }

  async existsById(id: ContactIdVO): Promise<boolean> {
    const count = await this.prisma.userContact.count({ where: { id: id.value } });
    return count > 0;
  }
}
