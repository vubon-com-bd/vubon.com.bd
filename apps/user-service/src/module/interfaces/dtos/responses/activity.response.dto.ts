/**
 * Activity Response DTO
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ActivityResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() userId!: string;
  @ApiProperty() type!: string;
  @ApiProperty() timestamp!: string;
  @ApiPropertyOptional() metadata?: Readonly<Record<string, unknown>>;
}

export class ActivityListResponseDto {
  @ApiProperty({ type: [ActivityResponseDto] })
  items!: readonly ActivityResponseDto[];
  @ApiProperty() total!: number;
  @ApiProperty() page!: number;
  @ApiProperty() limit!: number;
  @ApiProperty() totalPages!: number;
}

export class UserStatsResponseDto {
  @ApiProperty() userId!: string;
  @ApiProperty() totalActivities!: number;
  @ApiPropertyOptional() lastActivityAt?: string;
}
