import { BaseEntity } from './base.types';
import { ID, IDVO } from './id.types';
import { TIMESTAMP } from '@vubon/shared-constants';

// Entity এর জন্য জেনেরিক টাইপ, যেখানে ID টাইপ আলাদা করে উল্লেখযোগ্য
export interface Entity<T = unknown, IDType = string> extends Omit<BaseEntity, 'id'> {
  id: IDType;
  version: number;
  metadata: Record<string, unknown>;
  // TIMESTAMP ব্যবহার করে টাইমস্ট্যাম্প মেথড
  getCreatedAt(): string;
  getUpdatedAt(): string;
  // TIMESTAMP ফরম্যাট ব্যবহার করে টাইমস্ট্যাম্প ফরম্যাট করার মেথড
  getFormattedTimestamp(format?: string): string;
  toJSON(): T;
  toDTO(): Record<string, unknown>;
}

// স্ট্রিং আইডি সহ এন্টিটি - অর্থপূর্ণ ইন্টারফেস
export interface StringEntity<T = unknown> extends Entity<T, string> {
  // স্ট্রিং আইডি-র জন্য বিশেষ মেথড
  getIdAsString(): string;
}

// নম্বর আইডি সহ এন্টিটি - অর্থপূর্ণ ইন্টারফেস
export interface NumberEntity<T = unknown> extends Entity<T, number> {
  // নম্বর আইডি-র জন্য বিশেষ মেথড
  getIdAsNumber(): number;
}

// IDVO ব্যবহার করার জন্য এন্টিটি
export interface EntityWithIDVO<T = unknown> extends Omit<BaseEntity, 'id'> {
  id: IDVO;
  version: number;
  metadata: Record<string, unknown>;
  // IDVO থেকে আইডি বের করার মেথড
  getIdValue(): ID;
  getFormattedId(): string;
  toJSON(): T;
  toDTO(): Record<string, unknown>;
}

// এন্টিটি কনস্ট্রাক্টর টাইপ
export type EntityConstructor<T, IDType = string> = new (...args: unknown[]) => Entity<T, IDType>;

// টাইমস্ট্যাম্প সহ এন্টিটি - TIMESTAMP ব্যবহার করে
export interface TimestampedEntity<T = unknown, IDType = string> extends Entity<T, IDType> {
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  // TIMESTAMP.FORMAT ব্যবহার করে টাইমস্ট্যাম্প ফরম্যাট
  getTimestampInFormat(format?: string): string;
  // TIMESTAMP.TIMEZONE ব্যবহার করে টাইমজোন পাওয়া
  getTimezone(): string;
  // TIMESTAMP.PRECISION ব্যবহার করে নির্ভুলতা পাওয়া
  getPrecision(): string;
  getDeletionTimestamp(): string | null;
  softDelete(): void;
  restore(): void;
}

// অডিট ট্রেইল সহ এন্টিটি
export interface AuditableEntity<T = unknown, IDType = string> extends TimestampedEntity<
  T,
  IDType
> {
  createdBy: string;
  updatedBy: string;
  deletedBy?: string;
  // অডিট তথ্য পাওয়ার মেথড
  getAuditInfo(): {
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy: string;
    deletedAt?: Date;
    deletedBy?: string;
  };
}

// সফট ডিলিট সাপোর্ট সহ এন্টিটি
export interface SoftDeletableEntity<T = unknown, IDType = string> extends Entity<T, IDType> {
  deletedAt?: Date;
  // TIMESTAMP ব্যবহার করে ডিলিট টাইম ফরম্যাট
  getDeletionTimestamp(): string | null;
  checkIsActive(): boolean;
  softDelete(): void;
  restore(): void;
}

// ক্যাশেবল এন্টিটি
export interface CacheableEntity<T = unknown, IDType = string> extends Entity<T, IDType> {
  cacheKey: string;
  cacheTTL: number;
  // ক্যাশে কী জেনারেট করার মেথড
  generateCacheKey(): string;
  getCacheTTL(): number;
}

// সিরিয়ালাইজেবল এন্টিটি
export interface SerializableEntity<T = unknown, IDType = string> extends Entity<T, IDType> {
  // সিরিয়ালাইজেশন মেথড
  serialize(): string;
  deserialize(data: string): this;
  toJSON(): T;
  fromJSON(data: unknown): this;
}

// এন্টিটি ফ্যাক্টরি
export interface EntityFactory<T extends Entity> {
  create(data: unknown): T;
  createFromDTO(dto: unknown): T;
  createFromJSON(json: string): T;
}

// এন্টিটি রিপোজিটরি
export interface EntityRepository<T extends Entity, IDType = string> {
  findById(id: IDType): Promise<T | null>;
  findAll(): Promise<T[]>;
  save(entity: T): Promise<T>;
  update(id: IDType, data: Partial<T>): Promise<T>;
  delete(id: IDType): Promise<boolean>;
  softDelete(id: IDType): Promise<boolean>;
  restore(id: IDType): Promise<boolean>;
}

// এন্টিটি ভ্যালিডেটর
export interface EntityValidator<T extends Entity> {
  validate(entity: T): boolean;
  validateForCreate(data: unknown): boolean;
  validateForUpdate(data: Partial<T>): boolean;
  getValidationErrors(): string[];
}

// এন্টিটি ট্রান্সফরমার
export interface EntityTransformer<T extends Entity, DTO = unknown> {
  toDTO(entity: T): DTO;
  fromDTO(dto: DTO): T;
  toDTOList(entities: T[]): DTO[];
  fromDTOList(dtos: DTO[]): T[];
}

// এন্টিটি ম্যাপার
export interface EntityMapper<T extends Entity, DTO = unknown> extends EntityTransformer<T, DTO> {
  mapToEntity(dto: DTO): T;
  mapToDTO(entity: T): DTO;
  mapToEntityList(dtos: DTO[]): T[];
  mapToDTOList(entities: T[]): DTO[];
}

// TIMESTAMP ব্যবহার করে টাইমস্ট্যাম্প ইউটিলিটি
export const TimestampUtils = {
  // বর্তমান টাইমস্ট্যাম্প তৈরি
  now: (): Date => new Date(),

  // TIMESTAMP.FORMAT ব্যবহার করে ফরম্যাট
  format: (date: Date, format?: string): string => {
    const formatString = format || TIMESTAMP.FORMAT;
    // সিম্পল ফরম্যাটিং - প্রোডাকশনে moment.js বা date-fns ব্যবহার করুন
    if (formatString === TIMESTAMP.FORMAT) {
      return date.toISOString();
    }
    return date.toISOString();
  },

  // TIMESTAMP.TIMEZONE ব্যবহার করে টাইমজোন
  getTimezone: (): string => {
    return TIMESTAMP.TIMEZONE || 'UTC';
  },

  // TIMESTAMP.PRECISION ব্যবহার করে নির্ভুলতা
  getPrecision: (): string => {
    return TIMESTAMP.PRECISION || 'millisecond';
  },

  // টাইমস্ট্যাম্প তুলনা
  compare: (a: Date, b: Date): number => {
    return a.getTime() - b.getTime();
  },

  // টাইমস্ট্যাম্প ভ্যালিডেশন
  isValid: (date: Date): boolean => {
    return !isNaN(date.getTime());
  },

  // TIMESTAMP.FORMAT ব্যবহার করে ISO স্ট্রিং
  toISOString: (date: Date): string => {
    return date.toISOString();
  },

  // TIMESTAMP.TIMEZONE ব্যবহার করে লোকাল স্ট্রিং
  toLocaleString: (date: Date): string => {
    const timezone = TIMESTAMP.TIMEZONE || 'UTC';
    return date.toLocaleString('en-US', { timeZone: timezone });
  },
};
