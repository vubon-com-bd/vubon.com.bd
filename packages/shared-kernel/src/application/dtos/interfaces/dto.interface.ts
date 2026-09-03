/**
 * DTO Interface
 * ডিটিও ইন্টারফেস
 */
export interface IDTO {
  validate(): void;
  toJSON(): Record<string, unknown>;
}

// Marker interfaces using type aliases instead of empty interfaces
export type ICreateDTO = IDTO;
export type IUpdateDTO = IDTO;

export interface IResponseDTO<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
  statusCode: number;
  timestamp: string;
}

export interface IPaginatedResponseDTO<T> extends IResponseDTO<T[]> {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface IPaginationDTO {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  get skip(): number;
  get take(): number;
}

export interface IFilterDTO {
  conditions: { field: string; operator: string; value: unknown }[];
  logic: 'and' | 'or';
  addCondition(field: string, operator: string, value: unknown): this;
}
