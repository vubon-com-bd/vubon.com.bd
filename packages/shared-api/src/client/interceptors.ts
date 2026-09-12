/**
 * Request/Response interceptors.
 * @module shared-api/client/interceptors
 */

export interface RequestContext {
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: unknown;
}

export interface ResponseContext {
  status: number;
  data: unknown;
  headers: Record<string, string>;
}

export type RequestInterceptor = (ctx: RequestContext) => RequestContext | Promise<RequestContext>;

export type ResponseInterceptor = (
  ctx: ResponseContext
) => ResponseContext | Promise<ResponseContext>;

const requestInterceptors: RequestInterceptor[] = [];
const responseInterceptors: ResponseInterceptor[] = [];

export const addRequestInterceptor = (fn: RequestInterceptor): void => {
  requestInterceptors.push(fn);
};

export const addResponseInterceptor = (fn: ResponseInterceptor): void => {
  responseInterceptors.push(fn);
};

export const runRequestInterceptors = async (ctx: RequestContext): Promise<RequestContext> => {
  let current = ctx;
  for (const fn of requestInterceptors) {
    current = await fn(current);
  }
  return current;
};

export const runResponseInterceptors = async (ctx: ResponseContext): Promise<ResponseContext> => {
  let current = ctx;
  for (const fn of responseInterceptors) {
    current = await fn(current);
  }
  return current;
};

export const clearInterceptors = (): void => {
  requestInterceptors.length = 0;
  responseInterceptors.length = 0;
};
