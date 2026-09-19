import { ApiProperty } from '@nestjs/swagger';

export class TokenListByUserRequestDTO {
  @ApiProperty()
  userId!: string;
}

export class TokenRevokeRequestDTO {
  @ApiProperty()
  tokenId!: string;
}
