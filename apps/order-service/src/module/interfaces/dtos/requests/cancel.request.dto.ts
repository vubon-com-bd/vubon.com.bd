import { ApiProperty } from '@nestjs/swagger';

export class RequestCancelRequestDto {
  @ApiProperty()
  orderId!: string;

  @ApiProperty()
  reason!: string;
}

export class ApproveCancelRequestDto {
  @ApiProperty()
  cancelId!: string;

  @ApiProperty()
  approvedBy!: string;
}

export class RejectCancelRequestDto {
  @ApiProperty()
  cancelId!: string;

  @ApiProperty()
  reason!: string;
}

export class CompleteCancelRequestDto {
  @ApiProperty()
  cancelId!: string;
}
