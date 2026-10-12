/**
 * InitiateCheckoutHttpDTO
 * @module cart-service/interfaces/dtos/requests
 */
import { IsString, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class AddressHttpDTO {
  @ApiProperty() @IsString() line1!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() line2?: string;
  @ApiProperty() @IsString() city!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() state?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() district?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() division?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() postalCode?: string;
  @ApiProperty() @IsString() country!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() landmark?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() label?: string;
}

export class InitiateCheckoutHttpDTO {
  @ApiProperty({ type: AddressHttpDTO })
  @ValidateNested()
  @Type(() => AddressHttpDTO)
  shippingAddress!: AddressHttpDTO;

  @ApiPropertyOptional({ type: AddressHttpDTO })
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressHttpDTO)
  billingAddress?: AddressHttpDTO;

  @ApiPropertyOptional() @IsOptional() @IsString() paymentMethod?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() shippingMethod?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() customerNotes?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}
