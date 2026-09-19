import { ApiProperty } from '@nestjs/swagger';

export class SocialLoginRequestDTO {
  @ApiProperty({ example: 'google' })
  provider!: string;

  @ApiProperty()
  providerUserId!: string;
}

export class SocialLinkRequestDTO {
  @ApiProperty()
  provider!: string;

  @ApiProperty()
  providerUserId!: string;
}

export class SocialUnlinkRequestDTO {
  @ApiProperty()
  provider!: string;
}

export class SocialCallbackRequestDTO {
  @ApiProperty()
  provider!: string;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  state!: string;
}
