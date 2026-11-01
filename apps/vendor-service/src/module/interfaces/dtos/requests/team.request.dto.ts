/**
 * Team HTTP Request DTOs
 * @module vendor-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail, IsEnum, IsOptional, IsString, IsUUID,
  MaxLength, MinLength,
} from 'class-validator';

export const TEAM_ROLE_VALUES = [
  'vendor_owner', 'vendor_manager', 'vendor_staff', 'vendor_accountant',
  'vendor_inventory_manager', 'vendor_order_manager',
  'vendor_customer_support', 'vendor_marketing', 'vendor_viewer',
] as const;

export class AddTeamMemberHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsUUID()
  readonly vendorId!: string;

  @ApiProperty({ example: 'member@example.com' })
  @IsEmail()
  readonly email!: string;

  @ApiProperty({ enum: TEAM_ROLE_VALUES })
  @IsEnum(TEAM_ROLE_VALUES)
  readonly role!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly message?: string;
}

export class UpdateTeamMemberHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  readonly fullName?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  readonly permissions?: readonly string[];
}

export class RemoveTeamMemberHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly reason?: string;
}

export class AssignRoleHttpDTO {
  @ApiProperty({ enum: TEAM_ROLE_VALUES })
  @IsEnum(TEAM_ROLE_VALUES)
  readonly role!: string;
}

export class AcceptInviteHttpDTO {
  @ApiProperty()
  @IsString()
  @MinLength(16)
  @MaxLength(255)
  readonly token!: string;
}
