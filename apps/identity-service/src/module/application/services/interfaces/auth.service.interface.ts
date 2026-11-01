/**
 * Auth Service Interface
 * @module identity-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { AuthEntity } from '../../../domain/entities/auth.entity.js';
import type { LoginRequestDTO } from '../../dtos/requests/auth/login.dto.js';
import type { RegisterRequestDTO } from '../../dtos/requests/auth/register.dto.js';
import type { LoginResponseDTO } from '../../dtos/responses/login-response.dto.js';
import type { RegisterResponseDTO } from '../../dtos/responses/register-response.dto.js';

export const AUTH_SERVICE = Symbol('AUTH_SERVICE');

export interface AuthServiceInterface extends BaseServiceInterface<AuthEntity, string> {
  login(input: LoginRequestDTO): Promise<LoginResponseDTO>;
  register(input: RegisterRequestDTO): Promise<RegisterResponseDTO>;
}
