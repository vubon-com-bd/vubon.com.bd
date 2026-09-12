import { ValueObject } from '../base/base.vo';

export class ID extends ValueObject<string> {
  protected validate(): void {
    if (!this._value || this._value.length === 0) {
      throw new Error('ID cannot be empty');
    }
    // Check if it's a valid UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(this._value)) {
      // Allow custom IDs but warn
      console.warn(`ID "${this._value}" is not a standard UUID format`);
    }
  }

  static generate(): ID {
    return new ID(crypto.randomUUID());
  }

  static fromString(value: string): ID {
    return new ID(value);
  }
}
