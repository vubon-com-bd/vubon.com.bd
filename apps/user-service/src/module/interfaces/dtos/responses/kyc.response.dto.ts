import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class KycResponseDto {
  @ApiProperty()
  userId!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty({ type: 'array', items: { type: 'object' } })
  documents!: ReadonlyArray<Record<string, unknown>>;

  @ApiPropertyOptional()
  submittedAt?: string;

  @ApiPropertyOptional()
  reviewedAt?: string;

  @ApiPropertyOptional()
  rejectionReason?: string;

  @ApiPropertyOptional()
  updatedAt?: string;
}
