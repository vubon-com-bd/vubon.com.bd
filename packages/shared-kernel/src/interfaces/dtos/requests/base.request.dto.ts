import { IsOptional, IsString } from 'class-validator';

export abstract class BaseRequestDto {
  @IsOptional()
  @IsString()
  requestId?: string;
}
