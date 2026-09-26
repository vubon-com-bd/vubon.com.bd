import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class InsightFindingResponseDTO {
  @ApiProperty()
  label!: string;

  @ApiProperty()
  value!: number;

  @ApiPropertyOptional({ nullable: true })
  unit!: string | null;
}

export class InsightResponseDTO {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  type!: string;

  @ApiProperty()
  priority!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  target!: string;

  @ApiProperty()
  summary!: string;

  @ApiProperty()
  confidence!: number;

  @ApiPropertyOptional({ type: [InsightFindingResponseDTO] })
  findings?: InsightFindingResponseDTO[];

  @ApiProperty()
  createdAt!: string;
}
