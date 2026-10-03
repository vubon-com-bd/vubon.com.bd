/**
 * UserResponseDTO
 * @module auth-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserResponseDTO {
  @ApiProperty() id!: string;
  @ApiProperty() email!: string;
  @ApiPropertyOptional() phone?: string;
  @ApiProperty() name!: string;
  @ApiProperty() status!: string;
  @ApiProperty() type!: string;
  @ApiProperty({ type: [String] }) roles!: string[];
  @ApiProperty() emailVerified!: boolean;
  @ApiProperty() phoneVerified!: boolean;
  @ApiProperty() mfaEnabled!: boolean;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}
