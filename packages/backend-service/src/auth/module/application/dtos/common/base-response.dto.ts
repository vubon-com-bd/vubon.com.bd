// packages/backend-service/src/auth/module/application/dtos/common/base-response.dto.ts

/**
 * Base DTO for all API responses
 * Provides a uniform structure for successful and failed operations
 */
export abstract class BaseResponseDto<T = unknown> {
  /**
   * Indicates whether the operation was successful
   */
  readonly success: boolean;

  /**
   * Human-readable message for the client (English/Bengali)
   */
  readonly message: string;

  /**
   * Timestamp when the response was generated
   */
  readonly timestamp: string;

  /**
   * Optional data payload (generic type)
   */
  readonly data?: T;

  /**
   * Optional error details for failed operations
   */
  readonly errors?: unknown;

  constructor(
    data?: T,
    message: string = 'Operation successful',
    success: boolean = true,
    errors?: unknown
  ) {
    this.data = data;
    this.message = message;
    this.success = success;
    this.errors = errors;
    this.timestamp = new Date().toISOString();
  }

  /**
   * Creates a successful response with data
   */
  static success<T>(data: T, message: string = 'Operation successful'): BaseResponseDto<T> {
    return new (class extends BaseResponseDto<T> {})(data, message, true);
  }

  /**
   * Creates a failure response with error details
   */
  static failure<T = unknown>(
    message: string = 'Operation failed',
    errors?: unknown
  ): BaseResponseDto<T> {
    return new (class extends BaseResponseDto<T> {})(undefined, message, false, errors);
  }

  /**
   * Checks if the response indicates success
   */
  isSuccess(): boolean {
    return this.success === true;
  }

  /**
   * Checks if the response indicates failure
   */
  isFailure(): boolean {
    return this.success === false;
  }

  /**
   * Extracts the data payload or throws an error if the operation failed
   */
  getDataOrThrow(): T {
    if (this.isFailure()) {
      throw new Error(this.message || 'Operation failed');
    }
    return this.data as T;
  }

  /**
   * Extracts the data payload or returns a default value
   */
  getDataOrDefault(defaultValue: T): T {
    if (this.isFailure()) {
      return defaultValue;
    }
    return this.data as T;
  }
}
