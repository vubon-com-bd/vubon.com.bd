/**
 * Address Response DTO
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddressResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() userId!: string;
  @ApiProperty() type!: string;
  @ApiProperty() line1!: string;
  @ApiPropertyOptional() line2?: string;
  @ApiProperty() city!: string;
  @ApiPropertyOptional() state?: string;
  @ApiPropertyOptional() postalCode?: string;
  @ApiProperty() country!: string;
  @ApiProperty() isDefault!: boolean;
  @ApiProperty() isDefaultShipping!: boolean;
  @ApiProperty() isDefaultBilling!: boolean;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class AddressListResponseDto {
  @ApiProperty({ type: [AddressResponseDto] }) items!: readonly AddressResponseDto[];
  @ApiProperty() total!: number;
}
