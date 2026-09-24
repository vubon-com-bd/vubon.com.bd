import { ApiProperty } from '@nestjs/swagger';

export class FileComplaintRequestDto {
  @ApiProperty()
  userId!: string;

  @ApiProperty({ example: 'service_quality' })
  type!: string;

  @ApiProperty({ example: 'high' })
  severity!: string;

  @ApiProperty()
  content!: string;
}
