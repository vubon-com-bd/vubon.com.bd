/**
 * Analytics HTTP Response DTOs
 * @module notification-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AnalyticsOverviewHttpResponseDTO {
  @ApiProperty() periodStart!: string;
  @ApiProperty() periodEnd!: string;
  @ApiProperty() totalSent!: number;
  @ApiProperty() totalDelivered!: number;
  @ApiProperty() totalFailed!: number;
  @ApiProperty() deliveryRate!: number;
  @ApiProperty() openRate!: number;
  @ApiProperty() clickRate!: number;
  @ApiProperty() unsubscribeRate!: number;
  @ApiProperty() byChannel!: Readonly<Record<string, unknown>>;
}

export class ChannelPerformanceHttpResponseDTO {
  @ApiProperty() channel!: string;
  @ApiProperty() sent!: number;
  @ApiProperty() delivered!: number;
  @ApiProperty() failed!: number;
  @ApiProperty() deliveryRate!: number;
  @ApiProperty() avgDeliveryMs!: number;
}

export class AnalyticsReportHttpResponseDTO {
  @ApiProperty() reportType!: string;
  @ApiProperty() format!: string;
  @ApiProperty() generatedAt!: string;
  @ApiProperty() data!: Readonly<Record<string, unknown>>;
  @ApiPropertyOptional() expiresAt?: string;
  @ApiPropertyOptional() downloadUrl?: string;
}
