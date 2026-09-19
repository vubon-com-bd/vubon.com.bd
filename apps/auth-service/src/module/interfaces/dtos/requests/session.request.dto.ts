import { ApiProperty } from '@nestjs/swagger';

export class SessionByIdRequestDTO {
  @ApiProperty()
  sessionId!: string;
}

export class SessionRevokeRequestDTO {
  @ApiProperty()
  sessionId!: string;

  @ApiProperty()
  reason!: string;
}

export class SessionListByUserRequestDTO {
  @ApiProperty()
  userId!: string;
}
