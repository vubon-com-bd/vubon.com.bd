/**
 * User Contact Prisma Mapper
 * @module identity-service/infrastructure/persistence/prisma/mappers
 */
import { UserContactEntity } from '../../../../domain/entities/user-contact.entity.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import { UserEmailVO } from '../../../../domain/value-objects/primitives/user-email.vo.js';
import { UserPhoneVO } from '../../../../domain/value-objects/primitives/user-phone.vo.js';

export interface PrismaUserContactRow {
  id: string;
  userId: string;
  contactType: string;
  contactValue: string;
  label: string | null;
  isPrimary: boolean;
  isVerified: boolean;
  verifiedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class UserContactPrismaMapper {
  static toDomain(raw: PrismaUserContactRow): UserContactEntity {
    const type = raw.contactType as 'email' | 'phone' | 'whatsapp' | 'telegram' | 'other';

    let email: UserEmailVO | undefined;
    let phone: UserPhoneVO | undefined;
    if (type === 'email') {
      try { email = UserEmailVO.reconstitute(raw.contactValue); } catch { /* ignore */ }
    } else if (type === 'phone' || type === 'whatsapp') {
      try { phone = UserPhoneVO.reconstitute(raw.contactValue); } catch { /* ignore */ }
    }

    return UserContactEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      props: {
        userId: UserIdVO.reconstitute(raw.userId),
        contactType: type,
        email,
        phone,
        contactValue: raw.contactValue,
        label: raw.label ?? undefined,
        isPrimary: raw.isPrimary,
        isVerified: raw.isVerified,
        verifiedAt: raw.verifiedAt
          ? new Date(raw.verifiedAt).toISOString()
          : undefined,
      },
    });
  }

  static toPersistence(entity: UserContactEntity): Record<string, unknown> {
    return {
      id: entity.id,
      userId: entity.userId.value,
      contactType: entity.contactType,
      contactValue: entity.contactValue,
      label: entity.label ?? null,
      isPrimary: entity.isPrimary,
      isVerified: entity.isVerified,
      verifiedAt: entity.verifiedAt ? new Date(entity.verifiedAt) : null,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
