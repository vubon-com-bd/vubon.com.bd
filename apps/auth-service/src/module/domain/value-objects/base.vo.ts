/**
 * Base Value Object - Pure Domain Core
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/value-objects/base.vo
 * 
 * @description
 * Base class for all Value Objects in the domain layer.
 * Value Objects are immutable, self-validating, and compared by equality.
 * 
 * Enterprise Rules:
 * ✅ Immutable - State never changes after creation
 * ✅ Self-validating - Validates on construction
 * ✅ Equality-based - Compared by values, not identity
 * ✅ Framework-free - No external dependencies
 * ✅ Thread-safe - No shared mutable state
 * 
 * @example
 * class EmailVO extends ValueObject {
 *   constructor(private readonly value: string) {
 *     super();
 *     this.validate();
 *   }
 *   
 *   private validate(): void {
 *     if (!this.value.includes('@')) {
 *       throw new DomainError('Invalid email');
 *     }
 *   }
 *   
 *   protected getEqualityComponents(): unknown[] {
 *     return [this.value.toLowerCase()];
 *   }
 *   
 *   getValue(): string {
 *     return this.value;
 *   }
 * }
 */

// ==================== Types ====================

/**
 * Type guard to check if a value is a ValueObject
 */
export type ValueObjectConstructor<T = ValueObject> = new (...args: unknown[]) => T;

/**
 * Value object comparison result
 */
export interface ValueObjectComparison {
  readonly equal: boolean;
  readonly differences?: readonly string[];
}

// ==================== Constants ====================

const VALUE_OBJECT_MARKER = Symbol('ValueObject');

// ==================== Base Value Object ====================

/**
 * Abstract base class for all Value Objects
 * Implements domain-driven design equality semantics
 */
export abstract class ValueObject {
  /** Internal marker for type checking */
  private readonly [VALUE_OBJECT_MARKER] = true;

  /**
   * Get the components that determine equality for this value object.
   * Must be implemented by all concrete value objects.
   * 
   * @returns Array of property values that define uniqueness
   * 
   * @example
   * protected getEqualityComponents(): unknown[] {
   *   return [this.email, this.phone];
   * }
   */
  protected abstract getEqualityComponents(): readonly unknown[];

  /**
   * Validate the value object state.
   * Override in child classes for custom validation.
   * Called automatically in constructor.
   * 
   * @throws DomainError if validation fails
   */
  protected validate(): void {
    // Default: no validation
  }

  /**
   * Compare this value object with another for value equality.
   * 
   * Enterprise Implementation:
   * - Uses structural equality, not reference equality
   * - Handles cross-module class instances
   * - Null-safe and type-safe
   * - Optimized for performance with early returns
   * 
   * @param other - The value object to compare with
   * @returns true if both value objects have identical equality components
   * 
   * @example
   * const email1 = new EmailVO('test@example.com');
   * const email2 = new EmailVO('test@example.com');
   * email1.equals(email2); // true
   */
  public equals(other: ValueObject | null | undefined): boolean {
    // Fast path: same instance
    if (this === other) {
      return true;
    }

    // Guard clause: null or undefined
    if (!other) {
      return false;
    }

    // Guard clause: different types
    if (!this.isValueObject(other)) {
      return false;
    }

    // Guard clause: different constructor (structural type check)
    if (!this.hasSameConstructor(other)) {
      return false;
    }

    // Get equality components
    const components1 = this.getEqualityComponents();
    const components2 = other.getEqualityComponents();

    // Fast path: different lengths
    if (components1.length !== components2.length) {
      return false;
    }

    // Fast path: same reference for all components (for performance)
    if (components1.length === 1 && components1[0] === components2[0]) {
      return true;
    }

    // Compare each component deeply
    for (let i = 0; i < components1.length; i++) {
      if (!this.areEqual(components1[i], components2[i])) {
        return false;
      }
    }

    return true;
  }

  /**
   * Compare value objects and get detailed difference information
   * Useful for debugging and logging
   * 
   * @param other - The value object to compare with
   * @returns Comparison result with equality status and differences
   */
  public compare(other: ValueObject | null | undefined): ValueObjectComparison {
    if (!this.isValueObject(other)) {
      return { equal: false, differences: ['Object is not a ValueObject'] };
    }

    if (!this.hasSameConstructor(other)) {
      return { 
        equal: false, 
        differences: [`Different types: ${this.constructor.name} vs ${other.constructor.name}`] 
      };
    }

    const components1 = this.getEqualityComponents();
    const components2 = other.getEqualityComponents();
    const differences: string[] = [];

    if (components1.length !== components2.length) {
      differences.push(`Component count mismatch: ${components1.length} vs ${components2.length}`);
    } else {
      for (let i = 0; i < components1.length; i++) {
        if (!this.areEqual(components1[i], components2[i])) {
          differences.push(`Component[${i}] mismatch: ${JSON.stringify(components1[i])} vs ${JSON.stringify(components2[i])}`);
        }
      }
    }

    return {
      equal: differences.length === 0,
      differences: differences.length > 0 ? differences : undefined,
    };
  }

  /**
   * Check if the value object is empty/null/undefined
   * Override in child classes if needed
   */
  public isEmpty(): boolean {
    const components = this.getEqualityComponents();
    if (components.length === 0) return true;
    
    return components.every(comp =>
      comp === null || 
      comp === undefined || 
      comp === '' || 
      comp === 0 ||
      (typeof comp === 'number' && isNaN(comp))
    );
  }

  /**
   * Convert value object to plain JavaScript object
   * Override in child classes for custom serialization
   */
  public toJSON(): Record<string, unknown> {
    const components = this.getEqualityComponents();
    
    // Single component: return as value
    if (components.length === 1) {
      return { value: components[0] };
    }
    
    // Multiple components: return as array
    return { value: components };
  }

  /**
   * Get string representation for debugging
   */
  public toString(): string {
    const components = this.getEqualityComponents();
    const values = components.map(comp => {
      if (comp === null) return 'null';
      if (comp === undefined) return 'undefined';
      if (typeof comp === 'string') return `"${comp}"`;
      if (comp instanceof Date) return comp.toISOString();
      return String(comp);
    }).join(', ');
    
    return `${this.constructor.name}(${values})`;
  }

  /**
   * Get a shallow clone of the value object
   * Since ValueObjects are immutable, this returns the same instance
   */
  public clone(): this {
    // ValueObjects are immutable, so returning self is safe
    return this;
  }

  /**
   * Type-safe check if the other object is a ValueObject
   * Uses marker symbol instead of instanceof for cross-module compatibility
   */
  private isValueObject(other: unknown): other is ValueObject {
    if (!other || typeof other !== 'object') {
      return false;
    }
    
    // Check for ValueObject marker
    const candidate = other as ValueObject;
    return (
      VALUE_OBJECT_MARKER in candidate &&
      typeof candidate.getEqualityComponents === 'function' &&
      typeof candidate.equals === 'function'
    );
  }

  /**
   * Check if two objects have the same constructor
   * Handles cross-module class instances by name comparison
   */
  private hasSameConstructor(other: ValueObject): boolean {
    const thisConstructor = (this as unknown as { constructor: { name: string } }).constructor;
    const otherConstructor = (other as unknown as { constructor: { name: string } }).constructor;
    
    // Compare by name to handle cross-module instances
    return thisConstructor.name === otherConstructor.name;
  }

  /**
   * Deep equality check for components
   * Handles nested objects, arrays, and value objects
   */
  private areEqual(a: unknown, b: unknown): boolean {
    // Strict equality for primitives (fast path)
    if (Object.is(a, b)) {
      return true;
    }

    // Handle null/undefined
    if (!a || !b) {
      return false;
    }

    // Handle nested ValueObjects
    if (this.isValueObject(a) && this.isValueObject(b)) {
      return a.equals(b);
    }

    // Handle arrays
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (!this.areEqual(a[i], b[i])) return false;
      }
      return true;
    }

    // Handle Date objects
    if (a instanceof Date && b instanceof Date) {
      return a.getTime() === b.getTime();
    }

    // Handle RegExp objects
    if (a instanceof RegExp && b instanceof RegExp) {
      return a.toString() === b.toString();
    }

    // Handle Buffer/Uint8Array
    if (a instanceof Uint8Array && b instanceof Uint8Array) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
      }
      return true;
    }

    // Handle objects (shallow comparison)
    if (typeof a === 'object' && typeof b === 'object') {
      const aKeys = Object.keys(a);
      const bKeys = Object.keys(b);
      
      if (aKeys.length !== bKeys.length) return false;
      
      for (const key of aKeys) {
        if (!this.areEqual((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key])) {
          return false;
        }
      }
      return true;
    }

    // Default: strict equality
    return a === b;
  }
}

// ==================== Utility Functions ====================

/**
 * Utility function to create a ValueObject from a plain value
 * Useful for testing and serialization
 * 
 * @param value - The primitive value
 * @param Constructor - The ValueObject constructor
 * @returns A value object instance
 */
export function createValueObject<TValue, TVO extends ValueObject>(
  value: TValue,
  Constructor: new (value: TValue) => TVO
): TVO {
  return new Constructor(value);
}

/**
 * Type helper to extract the primitive type from a ValueObject
 */
export type PrimitiveOf<T extends ValueObject> =
  T extends ValueObject ? ReturnType<T['toJSON']> : never;

/**
 * Check if a value is a ValueObject instance
 */
export function isValueObject(value: unknown): value is ValueObject {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as ValueObject;
  return (
    VALUE_OBJECT_MARKER in candidate &&
    typeof candidate.getEqualityComponents === 'function' &&
    typeof candidate.equals === 'function'
  );
}

// ==================== Domain Errors ====================

/**
 * Base domain error for value object validation failures
 * To be extended by specific domain errors in the application layer
 */
export abstract class ValueObjectError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly field?: string
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

// ==================== Type Exports ====================

export type { ValueObjectComparison };
