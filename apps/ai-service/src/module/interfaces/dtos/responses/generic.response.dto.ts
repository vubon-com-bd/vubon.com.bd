import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SuccessResponseDTO {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiPropertyOptional()
  message?: string;
}

export class PaginatedResponseDTO<T = unknown> {
  @ApiProperty({ type: [Object] })
  items!: readonly T[];

  @ApiProperty()
  total!: number;

  @ApiProperty()
  page!: number;

  @ApiProperty()
  limit!: number;
}
