import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ActivityHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly userId!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly category!: string;
  @ApiPropertyOptional() readonly description?: string;
  @ApiPropertyOptional() readonly ipAddress?: string;
  @ApiPropertyOptional() readonly userAgent?: string;
  @ApiPropertyOptional() readonly deviceId?: string;
  @ApiProperty() readonly occurredAt!: string;
}
