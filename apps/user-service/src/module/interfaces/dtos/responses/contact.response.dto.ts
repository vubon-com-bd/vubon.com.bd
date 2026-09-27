/**
 * Contact Response DTO
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ContactResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() userId!: string;
  @ApiProperty() type!: string;
  @ApiProperty() value!: string;
  @ApiPropertyOptional() label?: string;
  @ApiProperty() isPrimary!: boolean;
  @ApiProperty() isVerified!: boolean;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class ContactListResponseDto {
  @ApiProperty({ type: [ContactResponseDto] }) items!: readonly ContactResponseDto[];
  @ApiProperty() total!: number;
}
