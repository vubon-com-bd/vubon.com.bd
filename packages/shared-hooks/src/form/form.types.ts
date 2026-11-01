export type FormErrors<TValues> = Partial<Record<keyof TValues, string>>;

export interface FormState<TValues> {
  readonly values: TValues;
  readonly errors: FormErrors<TValues>;
  readonly touched: Partial<Record<keyof TValues, boolean>>;
  readonly dirty: Partial<Record<keyof TValues, boolean>>;
  readonly isSubmitting: boolean;
  readonly submitCount: number;
}

export type FormValidator<TValues> = (
  values: TValues
) => FormErrors<TValues> | Promise<FormErrors<TValues>>;

export interface FormOptions<TValues> {
  readonly initialValues: TValues;
  readonly validate?: FormValidator<TValues>;
  readonly onSubmit: (values: TValues) => void | Promise<void>;
}
