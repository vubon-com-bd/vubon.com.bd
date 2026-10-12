/**
 * User Response DTOs — Multi-shape
 * @module identity-service/application/dtos/responses
 */
import type { z } from 'zod';
import type { UserResponseSchema } from '@vubon/shared-schemas/user';

// ─── Full (admin) ──────────────────────────
export type UserResponseDTO = z.infer<typeof UserResponseSchema>;

// ─── Public (customer-safe) ────────────────
export interface UserPublicDTO {
  readonly id: string;
  readonly email: string;
  readonly displayName?: string;
  readonly username?: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly status: string;
  readonly type: string;
  readonly roles: readonly string[];
  readonly emailVerified: boolean;
  readonly phoneVerified?: boolean;
  readonly isMfaEnabled?: boolean;
  readonly createdAt: string;
}

// ─── Summary (list) ────────────────────────
export interface UserSummaryDTO {
  readonly id: string;
  readonly email: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly username?: string;
  readonly status: string;
  readonly type: string;
  readonly createdAt: string;
}

// ─── List ──────────────────────────────────
export interface UserListResponseDTO {
  readonly items: readonly UserSummaryDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

// ─── Detail ────────────────────────────────
export interface UserDetailDTO {
  readonly user: UserResponseDTO;
  readonly profile?: unknown;
  readonly settings?: unknown;
  readonly preferences?: unknown;
  readonly roles: readonly string[];
  readonly permissions: readonly string[];
}

// ─── Stats ─────────────────────────────────
export interface UserStatsResponseDTO {
  readonly total: number;
  readonly activeCount: number;
  readonly suspendedCount: number;
  readonly verifiedCount: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byType: Readonly<Record<string, number>>;
  readonly byRole: Readonly<Record<string, number>>;
}
