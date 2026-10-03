import { Injectable } from '@nestjs/common';

@Injectable()
export class CartHealth {
  check(): { status: string; module: string } {
    return { status: 'ok', module: 'cart' };
  }
}
