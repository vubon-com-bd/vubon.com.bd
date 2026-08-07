import { BaseValueObject } from './base.vo';

/**
 * User ID Value Object
 * Represents a validated user identifier (UUID)
 */
export class UserId extends BaseValueObject<string> {
  private constructor(value: string) {
    const normalized = value.trim();
    UserId.validate(normalized);
    super(normalized);
  }

  /**
   * Create a new UserId instance
   * @throws {Error} If the ID is invalid
   */
  static create(value: string): UserId {
    return new UserId(value);
  }

  /**
   * Generate a new UserId using UUID v4
   */
  static generate(): UserId {
    const uuid = crypto.randomUUID();
    return new UserId(uuid);
  }

  /**
   * Validate UUID format
   * @throws {Error} If the ID is invalid
   */
  private static validate(value: string): void {
    if (!value || typeof value !== 'string') {
      throw new Error('User ID must be a non-empty string');
    }

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(value)) {
      throw new Error(`Invalid UUID format: ${value}`);
    }
  }

  /**
   * Compare two UserId objects
   */
  equals(other: UserId | null | undefined): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    if (!(other instanceof UserId)) {
      return false;
    }
    return this._value === other._value;
  }

  /**
   * Get string representation
   */
  toString(): string {
    return this._value;
  }

  /**
   * Get the raw value
   */
  getValue(): string {
    return this._value;
  }
}
