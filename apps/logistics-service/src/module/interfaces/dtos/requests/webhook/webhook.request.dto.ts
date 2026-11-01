/**
 * Webhook HTTP Request DTOs — 10 providers
 * @module logistics-service/interfaces/dtos/requests/webhook
 *
 * ⚠️ Raw provider payloads. Actual signature verification + normalization
 *    happens in the respective infrastructure/external/couriers service.
 *    Then Interface mapper normalizes → application DTO.
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsObject, IsDateString } from 'class-validator';

// ═══ Common normalized shape (after raw → normalized) ═══
export class WebhookPayloadHttpDTO {
  @ApiProperty() @IsString()
  readonly trackingNumber!: string;

  @ApiProperty() @IsString()
  readonly status!: string;

  @ApiProperty() @IsDateString()
  readonly occurredAt!: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  readonly location?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  readonly message?: string;

  @ApiPropertyOptional() @IsOptional() @IsObject()
  readonly raw?: Readonly<Record<string, unknown>>;
}

export class WebhookRequestHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString()
  readonly signature?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  readonly timestamp?: string;

  @ApiProperty({ type: WebhookPayloadHttpDTO })
  readonly body!: WebhookPayloadHttpDTO;
}

// ═══ Provider-specific aliases (type-only, same shape) ═══
export type SaParibahanWebhookHttpDTO = WebhookRequestHttpDTO;
export type SundarbanWebhookHttpDTO = WebhookRequestHttpDTO;
export type RedxWebhookHttpDTO = WebhookRequestHttpDTO;
export type PathaoWebhookHttpDTO = WebhookRequestHttpDTO;
export type PaperflyWebhookHttpDTO = WebhookRequestHttpDTO;
export type SteadfastWebhookHttpDTO = WebhookRequestHttpDTO;
export type DhlWebhookHttpDTO = WebhookRequestHttpDTO;
export type FedexWebhookHttpDTO = WebhookRequestHttpDTO;
export type UpsWebhookHttpDTO = WebhookRequestHttpDTO;
export type AramexWebhookHttpDTO = WebhookRequestHttpDTO;
