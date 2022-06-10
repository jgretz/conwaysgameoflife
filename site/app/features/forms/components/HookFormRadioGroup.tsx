import React, {ReactNode} from 'react';
import {FormControl, FormLabel, RadioGroup, FormHelperText} from '@material-ui/core';
import {withFormContext, FormContextValues} from '@truefit/bach-react-hook-form';
import {compose, withEffect} from '@truefit/bach';

type PublicProps = {
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

type Props = PublicProps & {
  formContext: FormContextValues;
};

const HookFormRadioGroup = ({
  formContext,
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
  const {watch, setValue, errors} = formContext;
  const formValue = watch(name);
  const error = errors[name];
  const displayError = Boolean(error?.message);

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
      <RadioGroup
        name={name}
        value={formValue}
        row={row}
        onChange={(e) => setValue(name, e.target.value)}
      >
        {children}
      </RadioGroup>
      <FormHelperText>{displayError ? error.message : helperText}</FormHelperText>
    </FormControl>
  );
};

export default compose<PublicProps>(
  withFormContext(),

  withEffect(({name, formContext: {register}}: Props) => register({name}), []),
)(HookFormRadioGroup);
