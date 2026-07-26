/**
 * Shared schemas for authentication module
 * Exports all validation schemas
 */

export {
  RegisterSchema,
  PartialRegisterSchema,
  RegisterResponseSchema,
  type RegisterRequest,
  type RegisterResponse,
} from './auth/register.schema.js';
