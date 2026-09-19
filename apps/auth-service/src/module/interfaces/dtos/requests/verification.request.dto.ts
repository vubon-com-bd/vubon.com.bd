import { ApiProperty } from '@nestjs/swagger';

export class VerificationSubmitRequestDTO {
  @ApiProperty()
  userId!: string;

  @ApiProperty()
  type!: string;

  @ApiProperty()
  code!: string;
}
