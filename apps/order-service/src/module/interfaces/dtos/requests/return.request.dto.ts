import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RequestReturnRequestDto {
  @ApiProperty()
  orderId!: string;

  @ApiProperty()
  reason!: string;

  @ApiPropertyOptional({ type: [String] })
  itemIds?: readonly string[];
}

export class ApproveReturnRequestDto {
  @ApiProperty()
  returnId!: string;

  @ApiProperty()
  approvedBy!: string;
}

export class RejectReturnRequestDto {
  @ApiProperty()
  returnId!: string;

  @ApiProperty()
  reason!: string;
}

export class ReceiveReturnRequestDto {
  @ApiProperty()
  returnId!: string;

  @ApiProperty()
  receivedBy!: string;
}

export class CompleteReturnRequestDto {
  @ApiProperty()
  returnId!: string;
}
