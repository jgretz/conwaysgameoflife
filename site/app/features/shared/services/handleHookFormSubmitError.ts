import {reduce, camelCase} from 'lodash';
import {FieldValues, ManualFieldError} from 'react-hook-form';
import handleApiError from './handleApiError';
import {ApiError, ApiErrorResponseData} from '../types';
import {EnqueueSnackbarFunction} from '../enhancers/withSnackbar';

const GENERAL_VALIDATION_ERROR_FIELD = '__error__';

export type HandleHookFormSubmitErrorParameters<TFormValues extends FieldValues> = {
  error: ApiError;
  setFormErrors: (errors: ManualFieldError<TFormValues>[]) => void;
  setGeneralValidationErrors?: (errors: string[]) => void;
  enqueueSnackbar?: EnqueueSnackbarFunction;
  errorMessage?: string;
};

export default <TFormValues extends FieldValues>({
  error,
  setFormErrors,
  setGeneralValidationErrors = null,
  enqueueSnackbar = null,
  errorMessage = null,
}: HandleHookFormSubmitErrorParameters<TFormValues>) => {
  const data = error?.response?.data as ApiErrorResponseData;
  const apiValidationErrors = data?.errors;

  if (error?.response?.status === 400 && apiValidationErrors) {
    setFormErrors(
      reduce(
        apiValidationErrors,
        (accumulator: ManualFieldError<TFormValues>[], fieldErrors, field: string) => {
          if (field !== GENERAL_VALIDATION_ERROR_FIELD) {
            const [fieldError] = fieldErrors;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            accumulator.push({type: 'required', name: camelCase(field), message: fieldError});
          }

          return accumulator;
        },
        [],
      ),
    );

    if (setGeneralValidationErrors) {
      setGeneralValidationErrors(
        reduce(
          apiValidationErrors,
          (accumulator: string[], fieldErrors, field: string) =>
            field === GENERAL_VALIDATION_ERROR_FIELD
              ? accumulator.concat(fieldErrors)
              : accumulator,
          [],
        ),
      );
    }
  } else {
    handleApiError(error, enqueueSnackbar, errorMessage);
  }
};
