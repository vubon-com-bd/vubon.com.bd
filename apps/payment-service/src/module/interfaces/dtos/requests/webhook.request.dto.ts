/**
 * Webhook HTTP Request DTOs
 * @module payment-service/interfaces/dtos/requests
 *
 * Webhook payloads are free-form; validation happens in gateway adapters.
 * These DTOs document the expected shape for Swagger.
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString } from 'class-validator';

export class BkashWebhookHttpDTO {
  @ApiProperty({ example: 'TR0011abc123' })
  @IsString()
  readonly paymentID!: string;

  @ApiProperty({ example: 'BK123456' })
  @IsString()
  readonly trxID!: string;

  @ApiProperty({ example: '1500.00' })
  @IsString()
  readonly amount!: string;

  @ApiProperty({ example: 'BDT' })
  @IsOptional()
  @IsString()
  readonly currency?: string;

  @ApiProperty({ example: 'Completed' })
  @IsString()
  readonly transactionStatus!: string;

  @ApiPropertyOptional({ example: 'sig_abc123' })
  @IsOptional()
  @IsString()
  readonly signature?: string;
}

export class NagadWebhookHttpDTO {
  @ApiProperty({ example: '7c9e6679-...' })
  @IsString()
  readonly orderId!: string;

  @ApiProperty({ example: 'NG12345' })
  @IsString()
  readonly paymentRefId!: string;

  @ApiProperty({ example: '1500.00' })
  @IsString()
  readonly amount!: string;

  @ApiProperty({ example: 'Success' })
  @IsString()
  readonly status!: string;

  @ApiPropertyOptional({ example: 'IssuerPaymentRefNo' })
  @IsOptional()
  @IsString()
  readonly issuerPaymentRefNo?: string;

  @ApiPropertyOptional({ example: 'sig_abc123' })
  @IsOptional()
  @IsString()
  readonly signature?: string;
}

export class StripeWebhookHttpDTO {
  @ApiProperty({ example: 'evt_1OaBcDeFgHiJkLmN' })
  @IsString()
  readonly id!: string;

  @ApiProperty({ example: 'payment_intent.succeeded' })
  @IsString()
  readonly type!: string;

  @ApiProperty()
  @IsObject()
  readonly data!: {
    readonly object: Readonly<Record<string, unknown>>;
  };
}

export class SslcommerzWebhookHttpDTO {
  @ApiProperty({ example: 'TR0011' })
  @IsString()
  readonly tran_id!: string;

  @ApiProperty({ example: 'VAL001' })
  @IsString()
  readonly val_id!: string;

  @ApiProperty({ example: '1500.00' })
  @IsString()
  readonly amount!: string;

  @ApiProperty({ example: 'VALID' })
  @IsString()
  readonly status!: string;

  @ApiPropertyOptional({ example: 'sig_abc' })
  @IsOptional()
  @IsString()
  readonly verify_sign?: string;

  @ApiPropertyOptional({ example: 'key_abc' })
  @IsOptional()
  @IsString()
  readonly verify_key?: string;
}

export class PaypalWebhookHttpDTO {
  @ApiProperty({ example: 'WH-12345' })
  @IsString()
  readonly id!: string;

  @ApiProperty({ example: 'PAYMENT.CAPTURE.COMPLETED' })
  @IsString()
  readonly event_type!: string;

  @ApiProperty()
  @IsObject()
  readonly resource!: Readonly<Record<string, unknown>>;
}

export class AamarpayWebhookHttpDTO {
  @ApiProperty({ example: 'TR0011' })
  @IsString()
  readonly mer_txnid!: string;

  @ApiProperty({ example: 'PG001' })
  @IsOptional()
  @IsString()
  readonly pg_txnid?: string;

  @ApiProperty({ example: '1500.00' })
  @IsString()
  readonly amount!: string;

  @ApiProperty({ example: 'Successful' })
  @IsString()
  readonly pay_status!: string;

  @ApiPropertyOptional({ example: '2' })
  @IsOptional()
  @IsString()
  readonly status_code?: string;
}

export class RocketWebhookHttpDTO {
  @ApiProperty({ example: 'TR0011' })
  @IsString()
  readonly orderId!: string;

  @ApiProperty({ example: 'RCK12345' })
  @IsString()
  readonly rocketPaymentId!: string;

  @ApiProperty({ example: '1500.00' })
  @IsString()
  readonly amount!: string;

  @ApiProperty({ example: 'Success' })
  @IsString()
  readonly status!: string;

  @ApiPropertyOptional({ example: 'sig_abc' })
  @IsOptional()
  @IsString()
  readonly signature?: string;
}

export class CryptoWebhookHttpDTO {
  @ApiProperty({ example: 'tx_abc123' })
  @IsString()
  readonly txHash!: string;

  @ApiProperty({ example: '0x1234...' })
  @IsString()
  readonly fromAddress!: string;

  @ApiProperty({ example: '1500.00' })
  @IsString()
  readonly amount!: string;

  @ApiProperty({ example: 'USDT' })
  @IsString()
  readonly currency!: string;

  @ApiProperty({ example: 'confirmed' })
  @IsString()
  readonly status!: string;

  @ApiPropertyOptional({ example: 6 })
  @IsOptional()
  readonly confirmations?: number;
}
