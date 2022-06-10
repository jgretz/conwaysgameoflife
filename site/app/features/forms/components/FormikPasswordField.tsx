import React, {ReactNode, MouseEvent, useState, MouseEventHandler} from 'react';
import {
  FormHelperTextProps,
  IconButton,
  InputAdornment,
  InputLabelProps,
  TextField,
} from '@material-ui/core';
import {useField} from 'formik';
import {InputProps as StandardInputProps} from '@material-ui/core/Input/Input';
import {FilledInputProps} from '@material-ui/core/FilledInput';
import {OutlinedInputProps} from '@material-ui/core/OutlinedInput';
import {Visibility, VisibilityOff} from '@material-ui/icons';

type Props = {
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

export default ({
  name,
  autoComplete,
  autoFocus,
  disabled,
  FormHelperTextProps,
  fullWidth,
  helperText,
  id,
  InputLabelProps,
  InputProps,
  label,
  margin,
  placeholder,
  required,
  size,
  variant,
}: Props) => {
  const [field, meta] = useField(name);
  const displayError = Boolean(meta.touched && meta.error);
  const [showPassword, setShowPassword] = useState(false);

  const overriddenInputProps = InputProps ?? {};
  overriddenInputProps.endAdornment = (
    <ShowPasswordToggle
      showPassword={showPassword}
      onClickShowPassword={() => setShowPassword(!showPassword)}
    />
  );

  return (
    <TextField
      name={field.name}
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      disabled={disabled}
      error={displayError}
      FormHelperTextProps={FormHelperTextProps}
      fullWidth={fullWidth}
      helperText={displayError ? meta.error : helperText}
      id={id ?? name}
      InputLabelProps={InputLabelProps}
      InputProps={overriddenInputProps}
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
