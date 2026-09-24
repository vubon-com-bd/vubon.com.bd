import { ApiProperty } from '@nestjs/swagger';

export class ComplaintResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  userId!: string;

  @ApiProperty()
  type!: string;

  @ApiProperty()
  severity!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  content!: string;

  @ApiProperty()
  createdAt!: string;
}
