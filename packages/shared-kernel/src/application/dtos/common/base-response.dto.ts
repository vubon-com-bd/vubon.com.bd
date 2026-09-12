import { HTTP_STATUS } from '@vubon/shared-constants';

export class BaseResponseDTO<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
  statusCode: number;
  timestamp: string;

  constructor(data?: Partial<BaseResponseDTO<T>>) {
    this.success = data?.success ?? true;
    this.data = data?.data;
    this.message = data?.message;
    this.errors = data?.errors;
    this.statusCode = data?.statusCode ?? HTTP_STATUS.OK;
    this.timestamp = data?.timestamp ?? new Date().toISOString();
  }

  static success<T>(data: T, message?: string): BaseResponseDTO<T> {
    return new BaseResponseDTO<T>({
      success: true,
      data,
      message: message || 'Success',
      statusCode: HTTP_STATUS.OK,
    });
  }

  static failure<T>(message: string, errors?: string[], statusCode?: number): BaseResponseDTO<T> {
    return new BaseResponseDTO<T>({
      success: false,
      message,
      errors,
      statusCode: statusCode || HTTP_STATUS.BAD_REQUEST,
    });
  }

  static created<T>(data: T, message?: string): BaseResponseDTO<T> {
    return new BaseResponseDTO<T>({
      success: true,
      data,
      message: message || 'Created successfully',
      statusCode: HTTP_STATUS.CREATED,
    });
  }

  static notFound<T>(message?: string): BaseResponseDTO<T> {
    return BaseResponseDTO.failure<T>(
      message || 'Resource not found',
      ['Resource not found'],
      HTTP_STATUS.NOT_FOUND
    );
  }

  static unauthorized<T>(message?: string): BaseResponseDTO<T> {
    return BaseResponseDTO.failure<T>(
      message || 'Unauthorized',
      ['Authentication required'],
      HTTP_STATUS.UNAUTHORIZED
    );
  }

  static forbidden<T>(message?: string): BaseResponseDTO<T> {
    return BaseResponseDTO.failure<T>(
      message || 'Forbidden',
      ['Access denied'],
      HTTP_STATUS.FORBIDDEN
    );
  }

  static validationError<T>(errors: string[]): BaseResponseDTO<T> {
    return BaseResponseDTO.failure<T>(
      'Validation failed',
      errors,
      HTTP_STATUS.UNPROCESSABLE_ENTITY
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
    };
  }
}
