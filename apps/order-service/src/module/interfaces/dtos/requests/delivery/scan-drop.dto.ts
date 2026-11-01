/**
 * ScanDropHttpDTO — QR scan-based delivery confirmation
 * @module order-service/interfaces/dtos/requests/delivery
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class ScanDropHttpDTO {
  @ApiProperty({
    example: '{"v":1,"orderId":"uuid","invoiceId":"uuid","issuedAt":"2026...","sig":"hex"}',
    description: 'QR payload from invoice PDF (JSON string)',
  })
  @IsString()
  @MinLength(10)
  qrPayload!: string;

  @ApiPropertyOptional({ example: 'driver-uuid' })
  @IsOptional()
  @IsString()
  driverId?: string;

  @ApiPropertyOptional({ example: 'Delivered to customer' })
  @IsOptional()
  @IsString()
  notes?: string;
}
