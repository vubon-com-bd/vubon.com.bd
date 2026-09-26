import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserRequestDto {
  @ApiProperty({ example: 'user@example.com' })
  email!: string;

  @ApiProperty({ example: 'StrongP@ss123' })
  password!: string;

  @ApiProperty({ example: 'John Doe' })
  name!: string;

  @ApiProperty({ example: true })
  acceptTerms!: true;

  @ApiPropertyOptional({ example: 'customer' })
  type?: string;

  @ApiPropertyOptional()
  phone?: string;

  @ApiPropertyOptional()
  firstName?: string;

  @ApiPropertyOptional()
  lastName?: string;
}

export class UpdateUserRequestDto {
  @ApiPropertyOptional()
  emailVerified?: boolean;

  @ApiPropertyOptional()
  type?: string;

  @ApiPropertyOptional()
  status?: string;

  @ApiPropertyOptional()
  phone?: string;

  @ApiPropertyOptional()
  username?: string;
}

export class DeleteUserRequestDto {
  @ApiProperty()
  userId!: string;
}

export class ActivateUserRequestDto {
  @ApiProperty()
  userId!: string;
}

export class DeactivateUserRequestDto {
  @ApiProperty()
  userId!: string;

  @ApiPropertyOptional()
  reason?: string;
}

export class SuspendUserRequestDto {
  @ApiProperty()
  userId!: string;

  @ApiProperty()
  reason!: string;

  @ApiPropertyOptional()
  until?: string;
}

export class UnsuspendUserRequestDto {
  @ApiProperty()
  userId!: string;
}
