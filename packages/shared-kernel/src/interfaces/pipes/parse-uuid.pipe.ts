/**
 * Parse UUID Pipe
 * @module shared-kernel/interfaces/pipes
 */
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { HTTP_STATUS, REGEX } from '@vubon/shared-constants/common';

@Injectable()
export class ParseUuidPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    if (typeof value !== 'string' || !REGEX.UUID.test(value)) {
      throw new BadRequestException({
        statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
        message: 'Invalid UUID format',
      });
    }
    return value;
  }
}
