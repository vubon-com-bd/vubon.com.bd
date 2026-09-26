import { ApiProperty } from '@nestjs/swagger';

export class MergeResponseDto {
  @ApiProperty()
  mergerId!: string;

  @ApiProperty()
  sourceCartId!: string;

  @ApiProperty()
  targetCartId!: string;

  @ApiProperty()
  itemsAdded!: number;

  @ApiProperty()
  itemsMerged!: number;

  @ApiProperty()
  conflicts!: number;

  @ApiProperty()
  mergedAt!: string;
}
