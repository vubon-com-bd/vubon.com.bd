import { ApiProperty } from '@nestjs/swagger';

export class BiometricEnrollRequestDTO {
  @ApiProperty()
  biometricId!: string;

  @ApiProperty({ example: 'fingerprint' })
  type!: string;
}

export class BiometricVerifyRequestDTO {
  @ApiProperty()
  biometricId!: string;
}

export class BiometricDisableRequestDTO {
  @ApiProperty()
  userId!: string;
}
