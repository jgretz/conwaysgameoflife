import React, {ReactNode} from 'react';
import {FormControl, FormLabel, RadioGroup, FormHelperText} from '@material-ui/core';
import {useField} from 'formik';

type Props = {
  name: string;
  children: ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  helperText?: ReactNode;
  label?: ReactNode;
  margin?: 'none' | 'dense' | 'normal';
  required?: boolean;
  row?: boolean;
};

export default ({
  name,
  children,
  disabled,
  fullWidth,
  helperText,
  label,
  margin,
  required,
  row,
}: Props) => {
  const [field, meta] = useField(name);
  const displayError = Boolean(meta.touched && meta.error);

  return (
    <FormControl
      component="fieldset"
      disabled={disabled}
      error={displayError}
      fullWidth={fullWidth}
      margin={margin}
      required={required}
    >
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup name={name} value={field.value} row={row} onChange={field.onChange}>
        {children}
      </RadioGroup>
      <FormHelperText>{displayError ? meta.error : helperText}</FormHelperText>
    </FormControl>
  );
};
