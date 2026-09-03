import { ValueObject } from '../base/base.vo';

export class Type extends ValueObject<string> {
  protected validate(): void {
    if (!this._value || this._value.length === 0) {
      throw new Error('Type cannot be empty');
    }
  }

  isEqual(type: Type): boolean {
    return this._value === type._value;
  }

  isIn(types: Type[]): boolean {
    return types.some((t) => this.isEqual(t));
  }

  static fromString(value: string): Type {
    return new Type(value);
  }

  static create(value: string): Type {
    return new Type(value);
  }
}
