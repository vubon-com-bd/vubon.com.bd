import { Injectable } from '@nestjs/common';

@Injectable()
export class BankVerificationService {
  async verifyAccountNumber(accountNumber: string, bankName: string): Promise<boolean> {
    if (!accountNumber || accountNumber.length < 8) return false;
    if (!bankName || bankName.length < 2) return false;
    return true;
  }

  async verifyRoutingNumber(routingNumber: string): Promise<boolean> {
    return /^\d{6,9}$/.test(routingNumber);
  }
}
