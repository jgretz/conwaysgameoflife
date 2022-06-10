import React, {ReactNode} from 'react';
import {withFormContext, FormContextValues} from '@truefit/bach-react-hook-form';
import {compose, withEffect} from '@truefit/bach';
import {FormHelperTextProps, InputLabelProps, TextField} from '@material-ui/core';
import {InputProps as StandardInputProps} from '@material-ui/core/Input/Input';
import {FilledInputProps} from '@material-ui/core/FilledInput';
import {OutlinedInputProps} from '@material-ui/core/OutlinedInput';

type PublicProps = {
  name: string;
  autoComplete?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  FormHelperTextProps?: Partial<FormHelperTextProps>;
  fullWidth?: boolean;
  helperText?: ReactNode;
  id?: string;
  InputLabelProps?: Partial<InputLabelProps>;
  InputProps?:
    | Partial<StandardInputProps>
    | Partial<FilledInputProps>
    | Partial<OutlinedInputProps>;
  label?: ReactNode;
  margin?: 'none' | 'dense' | 'normal';
  multiline?: boolean;
  placeholder?: string;
  required?: boolean;
  rows?: string | number;
  rowsMax?: string | number;
  size?: 'small' | 'medium';
  type?: string;
  variant?: 'standard' | 'outlined' | 'filled';
};

type Props = PublicProps & {
  formContext: FormContextValues;
};

const HookFormTextField = ({
  formContext,
  name,
  autoComplete,
  autoFocus,
  disabled,
  FormHelperTextProps,
  fullWidth = true,
  helperText,
  id,
  InputLabelProps,
  InputProps,
  label,
  margin = 'normal',
  multiline,
  placeholder,
  required,
  rows,
  rowsMax,
  size,
  type,
  variant,
}: Props) => {
  const {register, errors, watch} = formContext;
  const error = errors[name];
  const displayError = Boolean(error?.message);

  if (type === 'hidden') {
    return (
      <TextField
        name={name}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        disabled={disabled}
        FormHelperTextProps={FormHelperTextProps}
        id={id ?? name}
        InputLabelProps={InputLabelProps}
        InputProps={InputProps}
        label={label}
        margin="none"
        multiline={multiline}
        placeholder={placeholder}
        required={required}
        rows={rows}
        rowsMax={rowsMax}
        size={size}
        type={type}
        value={watch(name)}
        variant={variant}
      />
    );
  }

  return (
    <TextField
      name={name}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      disabled={disabled}
      error={displayError}
      FormHelperTextProps={FormHelperTextProps}
      fullWidth={fullWidth}
      helperText={displayError ? error.message : helperText}
      id={id ?? name}
      InputLabelProps={InputLabelProps}
      InputProps={InputProps}
      inputRef={register}
      label={label}
      margin={margin}
      multiline={multiline}
      placeholder={placeholder}
      required={required}
      rows={rows}
      rowsMax={rowsMax}
      size={size}
      type={type}
      variant={variant}
    />
  );
};

export default compose<PublicProps>(
  withFormContext(),

  withEffect(({name, type, formContext: {register}}: Props) => {
    if (type === 'hidden') register({name});
  }, []),
)(HookFormTextField);
