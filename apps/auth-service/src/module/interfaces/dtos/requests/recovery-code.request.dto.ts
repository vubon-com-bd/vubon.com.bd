import { ApiProperty } from '@nestjs/swagger';

export class RecoveryCodeGenerateRequestDTO {
  @ApiProperty()
  userId!: string;

  @ApiProperty({ example: 10 })
  count!: number;
}

export class RecoveryCodeConsumeRequestDTO {
  @ApiProperty()
  userId!: string;

  @ApiProperty()
  code!: string;
}
