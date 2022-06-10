import {reduce, camelCase} from 'lodash';
import handleApiError from './handleApiError';
import {ApiError, ApiErrorResponseData} from '../types';
import {EnqueueSnackbarFunction} from '../enhancers/withSnackbar';

type FormErrors = {
  [field: string]: string;
};

export default (
  error: ApiError,
  setFormErrors: (errors: FormErrors) => void,
  enqueueSnackbar: EnqueueSnackbarFunction = null,
  errorMessage: string = null,
) => {
  const data = error?.response?.data as ApiErrorResponseData;
  const apiValidationErrors = data?.errors;

  if (error?.response?.status === 400 && apiValidationErrors) {
    setFormErrors(
      reduce(
        apiValidationErrors,
        (accumulator: FormErrors, fieldErrors, field: string) => {
          const [fieldError] = fieldErrors;
          accumulator[camelCase(field)] = fieldError;
          return accumulator;
        },
        {},
      ),
    );
  } else {
    handleApiError(error, enqueueSnackbar, errorMessage);
  }
};
