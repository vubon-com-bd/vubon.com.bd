import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class VerifyContactHttpDTO {
  @ApiProperty({ example: '123456' })
  @IsString()
  @Matches(/^\d{4,8}$/)
  code!: string;
}
