/**
 * Base Command
 * কমান্ডের বেস ক্লাস
 */
export abstract class BaseCommand<TResult = unknown> {
  abstract execute(): Promise<TResult>;

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
}
