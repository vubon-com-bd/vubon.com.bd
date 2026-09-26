import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID, IsNumber, IsPositive, Length, MaxLength } from 'class-validator';

export class GenerateInvoiceRequestDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  orderId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  subscriptionId?: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  amount!: number;

  @ApiProperty()
  @IsString()
  @Length(3, 3)
  currency!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  taxAmount?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  dueAt?: string;
}

export class SendInvoiceRequestDto {
  @ApiProperty()
  @IsUUID()
  invoiceId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  toEmail?: string;
}

export class VoidInvoiceRequestDto {
  @ApiProperty()
  @IsUUID()
  invoiceId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;
}
