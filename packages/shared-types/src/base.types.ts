/**
 * Base entity interface with common properties
 */
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  role?: string;
  permissions?: string[];
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
