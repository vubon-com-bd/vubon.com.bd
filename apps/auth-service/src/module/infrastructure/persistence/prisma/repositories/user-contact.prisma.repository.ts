import { Injectable } from '@nestjs/common';
import { UserContact as PrismaUserContact } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { UserContactEntity } from '../../../../domain/entities/user-contact.entity';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { UserPhoneVO } from '../../../../domain/value-objects/primitives/user-phone.vo';
import { UserEmailVO } from '../../../../domain/value-objects/primitives/user-email.vo';
import type { UserContactRepository } from '../../../../domain/repositories/user-contact.repository.interface';

@Injectable()
export class UserContactPrismaRepository
  extends BasePrismaRepository<UserContactEntity, UserIdVO>
  implements UserContactRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaUserContact): UserContactEntity {
    return UserContactEntity.reconstitute(
      UserIdVO.create(raw.userId),
      {
        userId: UserIdVO.create(raw.userId),
        phone: UserPhoneVO.create(raw.phone),
        email: UserEmailVO.create(raw.email),
        alternatePhone: raw.alternatePhone
          ? UserPhoneVO.create(raw.alternatePhone)
          : null,
        alternateEmail: raw.alternateEmail
          ? UserEmailVO.create(raw.alternateEmail)
          : null,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: UserIdVO): Promise<UserContactEntity | null> {
    const raw = await this.prisma.userContact.findUnique({
      where: { userId: id.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly UserContactEntity[]> {
    const rows = await this.prisma.userContact.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: UserContactEntity): Promise<UserContactEntity> {
    const data = {
      phone: entity.phone.value,
      email: entity.email.value,
      alternatePhone: entity.alternatePhone?.value ?? null,
      alternateEmail: entity.alternateEmail?.value ?? null,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.userContact.upsert({
      where: { userId: entity.userId.value },
      create: { id: entity.id.value, userId: entity.userId.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: UserIdVO): Promise<void> {
    await this.prisma.userContact.delete({ where: { userId: id.value } });
  }

  async findByUserId(userId: UserIdVO): Promise<UserContactEntity | null> {
    const raw = await this.prisma.userContact.findUnique({
      where: { userId: userId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
