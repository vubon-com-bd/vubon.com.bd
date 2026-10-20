/**
 * Checkout HTTP Request DTOs
 * @module order-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  MinLength,
} from 'class-validator';

export class StartCheckoutHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsUUID()
  readonly cartId!: string;

  @ApiPropertyOptional({ example: 'registered' })
  @IsOptional()
  @IsString()
  readonly type?: string;

  @ApiProperty({ example: 'customer@example.com' })
  @IsEmail()
  readonly email!: string;

  @ApiPropertyOptional({ example: '+8801712345678' })
  @IsOptional()
  @IsString()
  readonly phone?: string;
}

export class SelectAddressHttpDTO {
  @ApiPropertyOptional({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsOptional()
  @IsUUID()
  readonly shippingAddressId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly shippingAddress?: Readonly<Record<string, unknown>>;

  @ApiPropertyOptional({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsOptional()
  @IsUUID()
  readonly billingAddressId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly billingAddress?: Readonly<Record<string, unknown>>;
}

export class SelectShippingHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsUUID()
  readonly shippingMethodId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(0, 500)
  readonly notes?: string;
}

export class SelectPaymentHttpDTO {
  @ApiProperty({ example: 'bkash' })
  @IsString()
  @MinLength(1)
  readonly paymentMethod!: string;
}

export class ConfirmCheckoutHttpDTO {
  @ApiProperty({ example: 'bkash' })
  @IsString()
  @MinLength(1)
  readonly paymentMethod!: string;

  @ApiPropertyOptional({ example: 'bkash' })
  @IsOptional()
  @IsString()
  readonly paymentGateway?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(0, 1000)
  readonly customerNotes?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(8)
  readonly idempotencyKey?: string;

  @ApiProperty({ example: true })
  readonly acceptTerms!: true;
}

export class AbandonCheckoutHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(0, 500)
  readonly reason?: string;
}
