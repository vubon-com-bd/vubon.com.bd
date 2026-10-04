/**
 * User Response DTOs
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() email!: string;
  @ApiPropertyOptional() username?: string;
  @ApiPropertyOptional() phone?: string;
  @ApiProperty() status!: string;
  @ApiProperty() type!: string;
  @ApiProperty({ type: [String] }) roles!: readonly string[];
  @ApiProperty() emailVerified!: boolean;
  @ApiProperty() phoneVerified!: boolean;
  @ApiProperty() isMfaEnabled!: boolean;
  @ApiPropertyOptional() lastLoginAt?: string;
  @ApiPropertyOptional() lastActiveAt?: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class UserListResponseDto {
  @ApiProperty({ type: [UserResponseDto] }) items!: readonly UserResponseDto[];
  @ApiProperty() total!: number;
  @ApiProperty() page!: number;
  @ApiProperty() limit!: number;
  @ApiProperty() totalPages!: number;
}
