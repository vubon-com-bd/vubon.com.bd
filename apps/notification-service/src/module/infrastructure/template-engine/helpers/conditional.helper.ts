export function conditionalHelper(
  condition: boolean,
  ifTrue: string,
  ifFalse = '',
): string {
  return condition ? ifTrue : ifFalse;
}
