/**
 * Auth Service Implementation
 */

import { Injectable, Logger } from '@nestjs/common';
import { IAuthService } from '../interfaces/auth.service.interface.js';
import { RegisterDto } from '../../dtos/auth/register.dto.js';
import { AuthResponseDto } from '../../dtos/auth/auth-response.dto.js';
import { RegisterUserCommand } from '../../commands/auth/register-user.command.js';
import { RegisterUserHandler } from '../../commands/auth/register-user.handler.js';

@Injectable()
export class AuthServiceImpl implements IAuthService {
  private readonly logger = new Logger(AuthServiceImpl.name);

  constructor(private readonly registerUserHandler: RegisterUserHandler) {}

  async register(dto: RegisterDto): Promise<AuthResponseDto> {
    this.logger.log(`Registering new user with email: ${dto.email}`);

    try {
      dto.validate();
      const command = RegisterUserCommand.fromDto(dto);
      const response = await this.registerUserHandler.execute(command);
      this.logger.log(`User registered successfully: ${dto.email}`);
      return response;
    } catch (error) {
      this.logger.error(`Registration failed: ${error}`);
      throw error;
    }
  }
}
