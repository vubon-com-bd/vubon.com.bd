/**
 * UserRequestDTO — CRUD input for users
 * @module auth-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserRequestDTO {
  @ApiProperty({ format: 'email' })
  email!: string;

  @ApiProperty({ minLength: 8, maxLength: 128 })
  password!: string;

  @ApiPropertyOptional()
  firstName?: string;

  @ApiPropertyOptional()
  lastName?: string;

  @ApiPropertyOptional()
  phone?: string;

  @ApiProperty({ enum: ['customer', 'vendor', 'admin', 'support', 'logistics', 'moderator'] })
  type!: string;

  @ApiPropertyOptional({ default: true })
  sendVerificationEmail?: boolean;

  @ApiProperty({ default: true })
  acceptTerms!: boolean;
}

export class UpdateUserRequestDTO {
  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  phone?: string;

  @ApiPropertyOptional({ enum: ['active', 'inactive', 'suspended', 'pending'] })
  status?: string;

  @ApiPropertyOptional({ enum: ['customer', 'vendor', 'admin', 'support', 'logistics', 'moderator'] })
  type?: string;
}

export class DeleteUserRequestDTO {
  @ApiPropertyOptional({ maxLength: 500 })
  reason?: string;

  @ApiPropertyOptional({ default: false })
  hardDelete?: boolean;
}
