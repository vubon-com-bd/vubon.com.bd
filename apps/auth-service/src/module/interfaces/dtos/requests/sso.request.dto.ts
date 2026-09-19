import { ApiProperty } from '@nestjs/swagger';

export class SsoLoginRequestDTO {
  @ApiProperty({ example: 'oidc' })
  provider!: string;

  @ApiProperty()
  externalId!: string;
}

export class SsoCallbackRequestDTO {
  @ApiProperty()
  provider!: string;

  @ApiProperty()
  token!: string;
}

export class SsoLinkRequestDTO {
  @ApiProperty()
  provider!: string;

  @ApiProperty()
  externalId!: string;
}

export class SsoUnlinkRequestDTO {
  @ApiProperty()
  provider!: string;
}
