/**
 * Base DTO
 * ডিটিওর বেস ক্লাস
 */
export abstract class BaseDTO {
  abstract validate(): void;
  abstract toJSON(): Record<string, unknown>;

  protected validateRequired<T>(value: T | undefined | null, fieldName: string): void {
    if (value === undefined || value === null) {
      throw new Error(`${fieldName} is required`);
    }
  }

  protected validateString(value: string | undefined | null, fieldName: string): void {
    if (value !== undefined && value !== null && typeof value !== 'string') {
      throw new Error(`${fieldName} must be a string`);
    }
  }

  protected validateNumber(value: number | undefined | null, fieldName: string): void {
    if (value !== undefined && value !== null && typeof value !== 'number') {
      throw new Error(`${fieldName} must be a number`);
    }
  }

  protected validatePositiveNumber(value: number, fieldName: string): void {
    if (value <= 0) {
      throw new Error(`${fieldName} must be greater than 0`);
    }
  }

  protected validateEmail(value: string, fieldName: string = 'Email'): void {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) {
      throw new Error(`${fieldName} is invalid`);
    }
  }

  protected validatePhone(value: string, fieldName: string = 'Phone'): void {
    const phoneRegex = /^(?:\+880|880|0)?(?:1[3-9]\d{8})$/;
    if (!phoneRegex.test(value)) {
      throw new Error(`${fieldName} is invalid for Bangladesh`);
    }
  }
}
