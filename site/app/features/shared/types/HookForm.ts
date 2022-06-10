/* eslint-disable @typescript-eslint/no-explicit-any */
import {FieldValues, ManualFieldError} from 'react-hook-form';

export type HookFormSubmitFunction<TFormValues extends FieldValues> = (
  values: TFormValues,
  setFormErrors: (errors: ManualFieldError<TFormValues>[]) => void,
) => void | Promise<any>;

export type SetHookFormErrorsFunction<TFormValues extends FieldValues> = (
  errors: ManualFieldError<TFormValues>[],
) => void;

export type SetGeneralValidationErrorsFunction = (errors: string[]) => void;
