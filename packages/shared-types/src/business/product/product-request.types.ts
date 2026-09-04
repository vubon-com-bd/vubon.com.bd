/**
 * Product Request Types
 * প্রোডাক্ট রিকোয়েস্ট সম্পর্কিত টাইপ
 */

import { User } from '../../common/user';
import { PaginationOptions } from '../../common/paginated.response';

export interface ProductListRequest {
  categoryId?: string;
  brandId?: string;
  vendorId?: string;
  userId?: string;
  search?: string;
  status?: string[];
  type?: string[];
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  isDigital?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  pagination: PaginationOptions;
}

export interface ProductSearchRequest {
  query: string;
  categoryId?: string;
  brandId?: string;
  userId?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  isDigital?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

export interface ProductBulkRequest {
  productIds: string[];
  userId?: string;
  action: 'delete' | 'update' | 'publish' | 'unpublish' | 'approve' | 'reject';
  data?: Record<string, unknown>;
}

export interface ProductExportRequest {
  userId?: string;
  filters: {
    categoryId?: string;
    brandId?: string;
    vendorId?: string;
    status?: string[];
    type?: string[];
    minPrice?: number;
    maxPrice?: number;
    dateFrom?: Date;
    dateTo?: Date;
  };
  fields: string[];
  format: 'csv' | 'excel' | 'pdf' | 'json';
}

export interface ProductImportRequest {
  userId: string;
  file: File;
  format: 'csv' | 'excel' | 'json';
  mapping: Record<string, string>;
  options: {
    skipDuplicates?: boolean;
    updateExisting?: boolean;
    validateOnly?: boolean;
  };
}

export interface ProductBulkResponse {
  userId?: string;
  success: number;
  failed: number;
  errors: {
    row: number;
    field: string;
    message: string;
  }[];
}

export interface ProductRequestWithUser {
  user: User;
  request: ProductListRequest | ProductSearchRequest | ProductBulkRequest;
}
