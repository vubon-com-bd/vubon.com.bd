import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PaymentResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  orderId!: string;

  @ApiProperty()
  userId!: string;

  @ApiProperty()
  type!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  method!: string;

  @ApiPropertyOptional()
  gateway?: string;

  @ApiProperty()
  amount!: number;

  @ApiProperty()
  currency!: string;

  @ApiPropertyOptional()
  capturedAt?: string;

  @ApiPropertyOptional()
  failureReason?: string;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;
}

export class PaymentPublicResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  orderId!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  method!: string;

  @ApiPropertyOptional()
  gateway?: string;

  @ApiProperty()
  amount!: number;

  @ApiProperty()
  currency!: string;

  @ApiPropertyOptional()
  capturedAt?: string;

  @ApiProperty()
  createdAt!: string;
}

export class PaymentInitiateResponseDto {
  @ApiProperty()
  success!: true;

  @ApiProperty()
  paymentId!: string;

  @ApiPropertyOptional()
  redirectUrl?: string;

  @ApiPropertyOptional()
  gatewayPaymentId?: string;

  @ApiProperty()
  status!: string;
}

export class PaymentSummaryResponseDto {
  @ApiProperty()
  total!: number;

  @ApiProperty()
  paidCount!: number;

  @ApiProperty()
  failedCount!: number;

  @ApiProperty()
  totalAmount!: number;

  @ApiProperty()
  currency!: string;
}
