// packages/backend-service/src/auth/module/application/dtos/index.ts

/**
 * DTOs Exports
 * Central export point for all application-layer DTOs
 */

// Export common DTOs
export { BaseResponseDto } from './common/base-response.dto';
export {
  type PaginationRequestDto,
  type PaginationMetadataDto,
  PaginatedResponseDto,
  DEFAULT_PAGINATION,
  normalizePaginationParams,
} from './common/pagination.dto';
export { AuditDto, SoftDeleteAuditDto, type AuditFields } from './common/audit.dto';

// Export authentication DTOs (to be added)
// export { RegisterDto } from './auth/register.dto';
// export { LoginDto } from './auth/login.dto';
// export { RefreshTokenDto } from './auth/refresh-token.dto';

// Export user DTOs (to be added)
// export { UserProfileDto } from './user/profile.dto';
// export { UpdateProfileDto } from './user/update-profile.dto';

// Export session DTOs (to be added)
// export { SessionDto } from './session/session.dto';
// export { SessionListDto } from './session/session-list.dto';
