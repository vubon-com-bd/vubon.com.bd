export class BaseResponseDto<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
  statusCode: number;
  timestamp: string;
  requestId?: string;

  constructor(
    success: boolean,
    data?: T,
    message?: string,
    errors?: string[],
    statusCode?: number,
    requestId?: string
  ) {
    this.success = success;
    this.data = data;
    this.message = message;
    this.errors = errors;
    this.statusCode = statusCode || 200;
    this.timestamp = new Date().toISOString();
    this.requestId = requestId;
  }

  static success<T>(data: T, message?: string, requestId?: string): BaseResponseDto<T> {
    return new BaseResponseDto<T>(true, data, message || 'Success', undefined, 200, requestId);
  }

  static failure<T>(
    message: string,
    errors?: string[],
    statusCode?: number,
    requestId?: string
  ): BaseResponseDto<T> {
    return new BaseResponseDto<T>(false, undefined, message, errors, statusCode || 400, requestId);
  }

  static created<T>(data: T, message?: string, requestId?: string): BaseResponseDto<T> {
    return new BaseResponseDto<T>(true, data, message || 'Created', undefined, 201, requestId);
  }

  static noContent<T>(message?: string, requestId?: string): BaseResponseDto<T> {
    return new BaseResponseDto<T>(
      true,
      undefined,
      message || 'No content',
      undefined,
      204,
      requestId
    );
  }

  static notFound<T>(message?: string, requestId?: string): BaseResponseDto<T> {
    return new BaseResponseDto<T>(
      false,
      undefined,
      message || 'Not found',
      ['Resource not found'],
      404,
      requestId
    );
  }

  static unauthorized<T>(message?: string, requestId?: string): BaseResponseDto<T> {
    return new BaseResponseDto<T>(
      false,
      undefined,
      message || 'Unauthorized',
      ['Authentication required'],
      401,
      requestId
    );
  }

  static forbidden<T>(message?: string, requestId?: string): BaseResponseDto<T> {
    return new BaseResponseDto<T>(
      false,
      undefined,
      message || 'Forbidden',
      ['Access denied'],
      403,
      requestId
    );
  }

  static validationError<T>(
    errors: string[],
    message?: string,
    requestId?: string
  ): BaseResponseDto<T> {
    return new BaseResponseDto<T>(
      false,
      undefined,
      message || 'Validation failed',
      errors,
      422,
      requestId
    );
  }

  toJSON(): Record<string, unknown> {
    return {
      success: this.success,
      data: this.data,
      message: this.message,
      errors: this.errors,
      statusCode: this.statusCode,
      timestamp: this.timestamp,
      requestId: this.requestId,
    };
  }
}
