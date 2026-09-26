export class OrderCancelPolicyService {
  static canCancel(status: string): boolean {
    return ['pending', 'confirmed', 'processing'].includes(status);
  }
}
