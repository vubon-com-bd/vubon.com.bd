/**
 * Provider-Webhook (inbound) HTTP DTOs
 * @module notification-service/interfaces/dtos/requests/provider-webhook
 *
 * NOTE: These DTOs are intentionally loose — inbound payloads vary by provider.
 * Strict validation happens inside ProviderWebhookService per-provider.
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

export class ProviderWebhookProcessHttpDTO {
  @ApiProperty({
    enum: ['sendgrid', 'twilio', 'ses', 'mailgun', 'fcm', 'apns'],
  })
  @IsString()
  readonly provider!: string;

  @ApiProperty()
  @IsObject()
  readonly body!: Readonly<Record<string, unknown>>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  readonly headers?: Readonly<Record<string, string>>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly signature?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly rawBody?: string;
}
