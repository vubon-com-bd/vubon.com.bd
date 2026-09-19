import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserEntity } from '../../../domain/entities/user.entity';
import type { LoginRequestDTO } from '../../dtos/requests/auth/login.dto';
import type { RegisterRequestDTO } from '../../dtos/requests/auth/register.dto';
import type { LoginResponseDTO } from '../../dtos/responses/login-response.dto';
import type { RegisterResponseDTO } from '../../dtos/responses/register-response.dto';

export interface AuthServiceInterface
  extends BaseServiceInterface<UserEntity, string> {
  login(input: LoginRequestDTO): Promise<LoginResponseDTO>;
  register(input: RegisterRequestDTO): Promise<RegisterResponseDTO>;
  logout(sessionId: string): Promise<void>;
}
