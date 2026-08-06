import { BaseValueObject } from './base.vo';
import { randomUUID } from 'crypto';

/**
 * User ID Value Object
 * Represents a unique user identifier
 * Ensures type safety and validation for user IDs
 */
export class UserId extends BaseValueObject<string> {
  private constructor(value: string) {
    const normalized = value.trim();
    UserId.validate(normalized);
    super(normalized);
  }

  /**
   * Create a new User ID instance
   * @throws {Error} If the user ID is invalid
   */
  static create(value: string): UserId {
    return new UserId(value);
  }

  /**
   * Generate a new random User ID (UUID v4)
   */
  static generate(): UserId {
    return new UserId(randomUUID());
  }

  /**
   * Validate user ID format
   * @throws {Error} If the user ID is invalid
   */
  private static validate(value: string): void {
    if (!value || typeof value !== 'string') {
      throw new Error('User ID must be a non-empty string');
    }

    // Check if it's a valid UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(value)) {
      throw new Error(`Invalid user ID format: ${value}. Must be a valid UUID`);
    }
  }

  /**
   * Get the raw value
   */
  getValue(): string {
    return this._value;
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
}
