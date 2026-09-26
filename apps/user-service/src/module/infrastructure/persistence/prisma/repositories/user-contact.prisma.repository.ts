import { Injectable } from '@nestjs/common';
import { UserContact as PrismaUserContact } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { UserContactEntity } from '../../../../domain/entities/user-contact.entity';
import { ContactIdVO } from '../../../../domain/value-objects/primitives/contact-id.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { ContactTypeVO } from '../../../../domain/value-objects/primitives/contact-type.vo';
import { ContactValueVO } from '../../../../domain/value-objects/primitives/contact-value.vo';
import type { UserContactRepository } from '../../../../domain/repositories/user-contact.repository.interface';

@Injectable()
export class UserContactPrismaRepository
  extends BasePrismaRepository<UserContactEntity, ContactIdVO>
  implements UserContactRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaUserContact): UserContactEntity {
    return UserContactEntity.reconstitute(
      ContactIdVO.create(raw.id),
      {
        userId: UserIdVO.create(raw.userId),
        type: ContactTypeVO.create(raw.type),
        value: ContactValueVO.create(raw.value),
        verified: raw.verified,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: ContactIdVO): Promise<UserContactEntity | null> {
    const raw = await this.prisma.userContact.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly UserContactEntity[]> {
    const rows = await this.prisma.userContact.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: UserContactEntity): Promise<UserContactEntity> {
    const data = {
      userId: entity.userId.value,
      type: entity.type.value,
      value: entity.value.value,
      verified: entity.verified,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.userContact.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: ContactIdVO): Promise<void> {
    await this.prisma.userContact.delete({ where: { id: id.value } });
  }

  async findByUserId(userId: UserIdVO): Promise<readonly UserContactEntity[]> {
    const rows = await this.prisma.userContact.findMany({
      where: { userId: userId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async countByUserId(userId: UserIdVO): Promise<number> {
    return this.prisma.userContact.count({ where: { userId: userId.value } });
  }
}
