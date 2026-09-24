import { ApiProperty } from '@nestjs/swagger';

export class KpiResponseDTO {
  @ApiProperty()
  kpiId!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  metricName!: string;

  @ApiProperty()
  target!: number;

  @ApiProperty()
  threshold!: number;

  @ApiProperty()
  createdAt!: string;
}

export class KpiResultResponseDTO {
  @ApiProperty()
  kpiId!: string;

  @ApiProperty()
  actual!: number;

  @ApiProperty()
  target!: number;

  @ApiProperty()
  achievementPercent!: number;

  @ApiProperty()
  variance!: number;

  @ApiProperty()
  isAchieved!: boolean;

  @ApiProperty()
  isBreached!: boolean;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  evaluatedAt!: string;
}
