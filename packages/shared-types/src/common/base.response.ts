/**
 * Base Response
 * সকল রেসপন্সের বেস টাইপ
 */
export interface BaseResponse<T = unknown> {
  success: boolean;
  data: T;
  message: string;
  errors: string[] | null;
  statusCode: number;
  timestamp: string;
}

/**
 * Base Response with Metadata
 * মেটাডেটা সহ বেস রেসপন্স
 */
export interface BaseResponseWithMeta<T = unknown> extends BaseResponse<T> {
  meta: {
    requestId: string;
    path: string;
    method: string;
    duration: number;
  };
}

/**
 * Success Response Builder
 * সাকসেস রেসপন্স বিল্ডার
 */
export interface SuccessResponse<T = unknown> {
  success: true;
  data: T;
  message: string;
  errors: null;
  statusCode: number;
}

/**
 * Error Response
 * এরর রেসপন্স
 */
export interface ErrorResponse {
  success: false;
  data: null;
  message: string;
  errors: string[];
  statusCode: number;
}
