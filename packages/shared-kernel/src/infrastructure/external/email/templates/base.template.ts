export abstract class BaseTemplate {
  abstract getSubject(): string;
  abstract render(data: unknown): string;
}
