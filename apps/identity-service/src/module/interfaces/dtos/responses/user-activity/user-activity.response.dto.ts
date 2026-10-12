import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserActivityHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly userId!: string;
  @ApiProperty() readonly type!: string;
  @ApiPropertyOptional() readonly description?: string;
  @ApiPropertyOptional() readonly ipAddress?: string;
  @ApiPropertyOptional() readonly userAgent?: string;
  @ApiPropertyOptional() readonly deviceId?: string;
  @ApiPropertyOptional({ type: Object }) readonly metadata?: Readonly<Record<string, unknown>>;
  @ApiProperty() readonly occurredAt!: string;
}
