import { ApiProperty } from '@nestjs/swagger';

export class MfaEnableRequestDTO {
  @ApiProperty({ example: 'totp' })
  method!: string;
}

export class MfaVerifyRequestDTO {
  @ApiProperty({ example: '123456' })
  code!: string;
}

export class MfaDisableRequestDTO {
  @ApiProperty()
  userId!: string;
}

export class MfaSetupRequestDTO {
  @ApiProperty()
  userId!: string;

  @ApiProperty()
  method!: string;
}
