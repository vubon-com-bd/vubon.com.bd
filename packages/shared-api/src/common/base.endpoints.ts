/**
 * Base Endpoints
 * বেস এন্ডপয়েন্ট
 */

export interface BaseEndpoints {
  list: string;
  detail: (id: string) => string;
  create: string;
  update: (id: string) => string;
  delete: (id: string) => string;
}

export const baseEndpoints: BaseEndpoints = {
  list: '/',
  detail: (id: string) => `/${id}`,
  create: '/',
  update: (id: string) => `/${id}`,
  delete: (id: string) => `/${id}`,
} as const;

export type BaseEndpointKey = keyof typeof baseEndpoints;

// HTTP Methods
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  OPTIONS: 'OPTIONS',
  HEAD: 'HEAD',
} as const;

export type HttpMethod = (typeof HTTP_METHODS)[keyof typeof HTTP_METHODS];

// API Versions
export const API_VERSIONS = {
  V1: 'v1',
  V2: 'v2',
  V3: 'v3',
} as const;

export type ApiVersion = (typeof API_VERSIONS)[keyof typeof API_VERSIONS];

// Content Types
export const CONTENT_TYPES = {
  JSON: 'application/json',
  FORM: 'application/x-www-form-urlencoded',
  MULTIPART: 'multipart/form-data',
  STREAM: 'application/octet-stream',
  PDF: 'application/pdf',
  CSV: 'text/csv',
  EXCEL: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
} as const;

export type ContentType = (typeof CONTENT_TYPES)[keyof typeof CONTENT_TYPES];

// Base API Headers
export const BASE_HEADERS = {
  'Content-Type': CONTENT_TYPES.JSON,
  Accept: CONTENT_TYPES.JSON,
} as const;

// Base URL
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// API Prefix
export const API_PREFIX = '/api';

// Full base path
export const getBasePath = (version: ApiVersion = API_VERSIONS.V1): string => {
  return `${API_PREFIX}/${version}`;
};
