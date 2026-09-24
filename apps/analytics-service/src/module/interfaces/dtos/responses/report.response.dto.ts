import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ReportResponseDTO {
  @ApiProperty()
  reportId!: string;

  @ApiProperty()
  type!: string;

  @ApiProperty()
  format!: string;

  @ApiProperty()
  status!: string;

  @ApiPropertyOptional()
  frequency?: string;

  @ApiProperty()
  ownerId!: string;

  @ApiPropertyOptional()
  generatedAt?: string;

  @ApiPropertyOptional()
  nextRunAt?: string;

  @ApiProperty()
  isReady!: boolean;

  @ApiProperty()
  createdAt!: string;
}

export class ExportReportResponseDTO {
  @ApiProperty()
  format!: string;

  @ApiProperty()
  filename!: string;

  @ApiProperty()
  mimeType!: string;
}
