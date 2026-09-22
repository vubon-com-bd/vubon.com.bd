export class InvoiceNumberService {
  generate(prefix = 'INV', sequence: number): string {
    const year = new Date().getFullYear();
    const seq = String(sequence).padStart(6, '0');
    return `${prefix}-${year}-${seq}`;
  }
}
