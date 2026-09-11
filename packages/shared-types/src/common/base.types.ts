/**
 * Base entity interface with common properties
 * Note: domain-specific fields like status/role/permissions
 * are intentionally NOT here — they belong to their own entities.
 */
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  isDeleted: boolean;
}

/**
 * Base value object interface
 */
export interface BaseValueObject<T = unknown> {
  value: T;
  isValid(): boolean;
  equals(other: this): boolean;
}
