import React, {ReactNode, MouseEvent, MouseEventHandler} from 'react';
import {
  FormHelperTextProps,
  IconButton,
  InputAdornment,
  InputLabelProps,
  TextField,
} from '@material-ui/core';
import {InputProps as StandardInputProps} from '@material-ui/core/Input/Input';
import {FilledInputProps} from '@material-ui/core/FilledInput';
import {OutlinedInputProps} from '@material-ui/core/OutlinedInput';
import {Visibility, VisibilityOff} from '@material-ui/icons';
import {compose, withState} from '@truefit/bach';
import {FormContextValues, withFormContext} from '@truefit/bach-react-hook-form';

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
  placeholder?: string;
  required?: boolean;
  size?: 'small' | 'medium';
  variant?: 'standard' | 'outlined' | 'filled';
};

type Props = PublicProps & {
  formContext: FormContextValues;
  showPassword: boolean;
  setShowPassword: (showPassword: boolean) => void;
};

const HookFormPasswordField = ({
  formContext,
  showPassword,
  setShowPassword,
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
  placeholder,
  required,
  size,
  variant,
}: Props) => {
  const {register, errors} = formContext;
  const error = errors[name];
  const displayError = Boolean(error?.message);

  const overriddenInputProps = InputProps ?? {};
  overriddenInputProps.endAdornment = (
    <ShowPasswordToggle
      showPassword={showPassword}
      onClickShowPassword={() => setShowPassword(!showPassword)}
    />
  );

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
      InputProps={overriddenInputProps}
      inputRef={register}
      label={label}
      margin={margin}
      placeholder={placeholder}
      required={required}
      size={size}
      type={showPassword ? 'text' : 'password'}
      variant={variant}
    />
  );
};

type ShowPasswordToggleProps = {
  showPassword: boolean;
  onClickShowPassword: MouseEventHandler<HTMLButtonElement>;
};

const ShowPasswordToggle = ({showPassword, onClickShowPassword}: ShowPasswordToggleProps) => {
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => event.preventDefault();

  return (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={onClickShowPassword}
        onMouseDown={handleMouseDownPassword}
      >
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );
};

export default compose<PublicProps>(
  withFormContext(),

  withState('showPassword', 'setShowPassword', false),
)(HookFormPasswordField);
