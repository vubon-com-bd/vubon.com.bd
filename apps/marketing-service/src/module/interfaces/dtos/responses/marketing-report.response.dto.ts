import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MarketingReportResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  type!: string;

  @ApiProperty()
  format!: string;

  @ApiProperty()
  generatedAt!: string;

  @ApiPropertyOptional({ nullable: true })
  data?: unknown;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;
}
