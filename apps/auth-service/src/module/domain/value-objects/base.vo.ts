/**
 * Base value object class for all domain value objects
 * Provides common functionality for immutable value objects
 */

export interface ValueObjectProps {
  [key: string]: unknown;
}

export abstract class ValueObject<T extends ValueObjectProps = ValueObjectProps> {
  protected readonly props: T;

  protected constructor(props: T) {
    this.props = Object.freeze({ ...props });
  }

  public get value(): T {
    return this.props;
  }

  public equals(other: ValueObject<ValueObjectProps>): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    if (this === other) {
      return true;
    }

    if (!(other instanceof ValueObject)) {
      return false;
    }

    return this.deepEquals(this.props, other.props as T);
  }

  protected deepEquals(obj1: T, obj2: T): boolean {
    if (obj1 === obj2) {
      return true;
    }

    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
      return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      const safeKey = key as keyof T;
      const val1 = obj1[safeKey];
      const val2 = obj2[safeKey];

      if (this.isValueObject(val1) && this.isValueObject(val2)) {
        if (!val1.equals(val2)) {
          return false;
        }
      } else if (this.isValueObject(val1) || this.isValueObject(val2)) {
        return false;
      } else if (Array.isArray(val1) && Array.isArray(val2)) {
        if (!this.deepEqualsArray(val1, val2)) {
          return false;
        }
      } else if (typeof val1 === 'object' && typeof val2 === 'object') {
        if (!this.deepEquals(val1 as T, val2 as T)) {
          return false;
        }
      } else if (val1 !== val2) {
        return false;
      }
    }

    return true;
  }

  protected deepEqualsArray(arr1: unknown[], arr2: unknown[]): boolean {
    if (arr1 === arr2) {
      return true;
    }

    if (arr1.length !== arr2.length) {
      return false;
    }

    for (let i = 0; i < arr1.length; i++) {
      const item1 = arr1[i];
      const item2 = arr2[i];

      if (this.isValueObject(item1) && this.isValueObject(item2)) {
        if (!item1.equals(item2)) {
          return false;
        }
      } else if (this.isValueObject(item1) || this.isValueObject(item2)) {
        return false;
      } else if (Array.isArray(item1) && Array.isArray(item2)) {
        if (!this.deepEqualsArray(item1, item2)) {
          return false;
        }
      } else if (typeof item1 === 'object' && typeof item2 === 'object') {
        if (!this.deepEquals(item1 as T, item2 as T)) {
          return false;
        }
      } else if (item1 !== item2) {
        return false;
      }
    }

    return true;
  }

  protected isValueObject(value: unknown): value is ValueObject<ValueObjectProps> {
    return value instanceof ValueObject;
  }

  public clone(): this {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-return
    const prototype = Object.getPrototypeOf(this) as object;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const clone = Object.create(prototype);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    Object.assign(clone, this);
    return clone as this;
  }

  public toJSON(): ValueObjectProps {
    return this.props;
  }

  public toString(): string {
    return JSON.stringify(this.props);
  }
}

export abstract class SingleValueObject<T> extends ValueObject<{ value: T }> {
  protected constructor(value: T) {
    super({ value: value as unknown as ValueObjectProps[string] });
  }

  public override get value(): T {
    return this.props.value as unknown as T;
  }

  public override equals(other: ValueObject<ValueObjectProps>): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    if (this === other) {
      return true;
    }

    if (!(other instanceof SingleValueObject)) {
      return false;
    }

    return this.value === other.value;
  }

  public override toJSON(): T {
    return this.value;
  }

  public override toString(): string {
    return String(this.value);
  }
}

export abstract class ComparableValueObject<T> extends SingleValueObject<T> {
  protected constructor(value: T) {
    super(value);
  }

  public compareTo(other: ComparableValueObject<T>): number {
    if (this.value < other.value) {
      return -1;
    }
    if (this.value > other.value) {
      return 1;
    }
    return 0;
  }

  public isGreaterThan(other: ComparableValueObject<T>): boolean {
    return this.compareTo(other) > 0;
  }

  public isLessThan(other: ComparableValueObject<T>): boolean {
    return this.compareTo(other) < 0;
  }

  public isEqualTo(other: ComparableValueObject<T>): boolean {
    return this.compareTo(other) === 0;
  }

  public isGreaterThanOrEqualTo(other: ComparableValueObject<T>): boolean {
    return this.compareTo(other) >= 0;
  }

  public isLessThanOrEqualTo(other: ComparableValueObject<T>): boolean {
    return this.compareTo(other) <= 0;
  }
}

export abstract class CollectionValueObject<T> extends ValueObject<{
  items: readonly T[];
}> {
  protected constructor(items: T[]) {
    super({ items: Object.freeze([...items]) as unknown as ValueObjectProps[string] });
  }

  public get items(): readonly T[] {
    return this.props.items as unknown as readonly T[];
  }

  public get length(): number {
    return this.items.length;
  }

  public isEmpty(): boolean {
    return this.items.length === 0;
  }

  public contains(item: T): boolean {
    return this.items.includes(item);
  }

  public override equals(other: ValueObject<ValueObjectProps>): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    if (this === other) {
      return true;
    }

    if (!(other instanceof CollectionValueObject)) {
      return false;
    }

    if (this.items.length !== other.items.length) {
      return false;
    }

    for (let i = 0; i < this.items.length; i++) {
      const currentItem = this.items[i];
      const otherItem = other.items[i];
      if (currentItem !== otherItem) {
        return false;
      }
    }

    return true;
  }

  public toArray(): T[] {
    return [...this.items];
  }

  public override toJSON(): readonly T[] {
    return this.toArray();
  }
}

export abstract class ValueObjectFactory<T extends ValueObject<ValueObjectProps>> {
  public abstract create(props: ValueObjectProps): T;
  public abstract reconstitute(props: ValueObjectProps): T;
  public abstract isValid(props: ValueObjectProps): boolean;
}

export const isValueObject = (value: unknown): value is ValueObject<ValueObjectProps> => {
  return value instanceof ValueObject;
};

export const isSingleValueObject = <T>(value: unknown): value is SingleValueObject<T> => {
  return value instanceof SingleValueObject;
};

export const isComparableValueObject = <T>(value: unknown): value is ComparableValueObject<T> => {
  return value instanceof ComparableValueObject;
};

export const isCollectionValueObject = <T>(value: unknown): value is CollectionValueObject<T> => {
  return value instanceof CollectionValueObject;
};

export abstract class ValidatedValueObject<T extends ValueObjectProps> extends ValueObject<T> {
  protected constructor(props: T) {
    super(props);
    this.validate();
  }

  protected abstract validate(): void;

  public isValid(): boolean {
    try {
      this.validate();
      return true;
    } catch {
      return false;
    }
  }
}
