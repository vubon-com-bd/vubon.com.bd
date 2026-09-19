/**
 * Base Response DTO
 * @module shared-kernel/application/dtos
 *
 * Values আসে shared-constants/common/http-status.constants থেকে।
 */
import { HTTP_STATUS } from '@vubon/shared-constants/common';

export type HttpResponseStatus = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];

export class BaseResponseDTO<T = unknown> {
  success: boolean = true;
  status: HttpResponseStatus = HTTP_STATUS.OK as HttpResponseStatus;
  message?: string;
  data?: T;
  timestamp: string = new Date().toISOString();

  static ok<T>(data: T, message?: string): BaseResponseDTO<T> {
    const dto = new BaseResponseDTO<T>();
    dto.success = true;
    dto.status = HTTP_STATUS.OK as HttpResponseStatus;
    dto.data = data;
    dto.message = message;
    return dto;
  }

  static created<T>(data: T, message?: string): BaseResponseDTO<T> {
    const dto = new BaseResponseDTO<T>();
    dto.success = true;
    dto.status = HTTP_STATUS.CREATED as HttpResponseStatus;
    dto.data = data;
    dto.message = message;
    return dto;
  }
}
